/**
 * POST /api/login — verifies username/password against the users table in
 * Postgres, then mints a signed session token carrying the student's
 * subscription expiry. That token — not the password — is what
 * /api/content, /api/quiz, /api/exercise, and /api/progress require on
 * every request.
 */
const { sql, ensureSchema } = require('./_db');
const { verifyPassword } = require('./_password');
const { signToken } = require('./_auth');

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

    const expiresAt = user.expires_at ? new Date(user.expires_at).toISOString() : null;
    let token;
    try {
      token = signToken({ u: user.username, e: expiresAt, t: Date.now(), r: 'student' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server belum siap (SESSION_SECRET belum di-set) — hubungi admin.' });
      return;
    }

    res.status(200).json({ success: true, nama: user.nama, expiresAt, token });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal terhubung ke database.' });
  }
};
