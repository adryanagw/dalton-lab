/**
 * POST /api/login — verifies username/password against the users table in
 * Postgres, then mints a signed session token carrying the student's
 * subscription expiry. That token — not the password — is what
 * /api/content, /api/quiz, /api/exercise, and /api/progress require on
 * every request.
 *
 * Also enforces a 2-device cap per account: each successful login rows
 * itself into `sessions`, and a login attempt is refused once 2 rows
 * already exist for that username — the student has to sign out of one
 * of the other devices (frees the row via /api/logout) before a new one
 * can log in. The oldest row is auto-reclaimed instead of blocking
 * forever if it's more than 30 days old, so a lost/abandoned device
 * doesn't permanently eat a slot.
 */
const crypto = require('crypto');
const { sql, ensureSchema } = require('./_db');
const { verifyPassword } = require('./_password');
const { signToken } = require('./_auth');

const MAX_DEVICES = 2;
const STALE_SESSION_DAYS = 30;

module.exports = async function handler(req, res) {
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

    const existingSessions = await sql`
      SELECT id, created_at FROM sessions WHERE username = ${user.username} ORDER BY created_at ASC
    `;
    if (existingSessions.length >= MAX_DEVICES) {
      const oldest = existingSessions[0];
      const staleMs = Date.now() - new Date(oldest.created_at).getTime();
      if (staleMs > STALE_SESSION_DAYS * 24 * 60 * 60 * 1000) {
        await sql`DELETE FROM sessions WHERE id = ${oldest.id}`;
      } else {
        res.status(403).json({
          success: false,
          message: `Akun ini lagi aktif di ${MAX_DEVICES} perangkat. Sign out dulu dari salah satu perangkat, baru login lagi di sini.`
        });
        return;
      }
    }

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
