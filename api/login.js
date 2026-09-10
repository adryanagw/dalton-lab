/**
 * POST /api/login — verifies username/password against the users table in
 * Postgres, then mints a signed session token carrying the student's
 * subscription expiry. That token — not the password — is what
 * /api/content, /api/quiz, /api/exercise, and /api/progress require on
 * every request.
 *
 * Single active device per account: logging in on a new device
 * automatically signs out every other device on that account (their
 * session rows are deleted) instead of blocking the new login — the
 * student never has to manually sign out elsewhere first. Tokens are
 * stateless (see _auth.js) and not checked against the sessions table
 * per-request, so an evicted device's own token keeps working locally
 * until it naturally expires — this eviction is "sign in here frees the
 * slot," not a live kill-switch on the other tab.
 *
 * DELETE /api/login — logout. Deletes this device's session row. Uses
 * signature-only verification (not the full verifyToken expiry check) so
 * a student whose subscription has lapsed can still sign out instead of
 * being stuck occupying the slot until they renew. Always responds
 * success — signing out of an already-dead/invalid session isn't an
 * error from the client's point of view.
 */
const crypto = require('crypto');
const { sql, ensureSchema } = require('./_db');
const { verifyPassword } = require('./_password');
const { signToken, verifySignature, getBearerToken } = require('./_auth');

module.exports = async function handler(req, res) {
  if (req.method === 'DELETE') {
    const payload = verifySignature(getBearerToken(req));
    if (payload && payload.u && payload.s) {
      try {
        await ensureSchema();
        await sql`DELETE FROM sessions WHERE username = ${payload.u} AND sid = ${payload.s}`;
      } catch (err) {
        // Non-critical — a later login on any device still evicts this
        // row via the auto-evict delete below, even if this delete fails.
      }
    }
    res.status(200).json({ success: true });
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed.' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  const username = String((body && body.username) || '').trim().toLowerCase();
  const password = String((body && body.password) || '');

  if (!username || !password) {
    res.status(400).json({ success: false, message: 'Username & password wajib diisi.' });
    return;
  }

  try {
    await ensureSchema();

    const rows = await sql`SELECT username, password_hash, nama, expires_at FROM users WHERE username = ${username}`;
    const user = rows[0];

    if (!user || !verifyPassword(password, user.password_hash)) {
      res.status(401).json({ success: false, message: 'Username atau password salah.' });
      return;
    }

    // Auto-evict: a fresh login always wins, no manual sign-out elsewhere required.
    await sql`DELETE FROM sessions WHERE username = ${user.username}`;

    const expiresAt = user.expires_at ? new Date(user.expires_at).toISOString() : null;
    const sid = crypto.randomUUID();
    let token;
    try {
      token = signToken({ u: user.username, e: expiresAt, t: Date.now(), r: 'student', s: sid });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server belum siap (SESSION_SECRET belum di-set) — hubungi admin.' });
      return;
    }

    await sql`
      INSERT INTO sessions (username, sid, user_agent) VALUES (${user.username}, ${sid}, ${req.headers['user-agent'] || null})
    `;

    res.status(200).json({ success: true, nama: user.nama, expiresAt, token });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal terhubung ke database.' });
  }
};
