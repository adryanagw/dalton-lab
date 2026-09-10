/**
 * POST /api/change-password — lets a logged-in student change their own
 * password from Settings. Requires the current password (re-verified
 * server-side, not trusted from the client just because the request
 * carries a valid session token) plus a new one.
 *
 * On success, every other device's session row is evicted (same
 * mechanism as the auto-evict-on-login in api/login.js) so a changed
 * password also kicks out anyone else who might have been using the
 * account elsewhere — the caller's own session (identified by payload.s)
 * is left standing so they aren't logged out by their own request.
 */
const { sql, ensureSchema } = require('./_db');
const { verifyPassword, hashPassword } = require('./_password');
const { verifyToken, getBearerToken } = require('./_auth');

const MIN_LENGTH = 6;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed.' });
    return;
  }

  const payload = verifyToken(getBearerToken(req));
  if (!payload || payload.r !== 'student') {
    res.status(401).json({ success: false, message: 'Sesi kamu habis, login ulang ya.' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  const currentPassword = String((body && body.currentPassword) || '');
  const newPassword = String((body && body.newPassword) || '');

  if (!currentPassword || !newPassword) {
    res.status(400).json({ success: false, message: 'Password lama & baru wajib diisi.' });
    return;
  }
  if (newPassword.length < MIN_LENGTH) {
    res.status(400).json({ success: false, message: `Password baru minimal ${MIN_LENGTH} karakter.` });
    return;
  }

  try {
    await ensureSchema();

    const rows = await sql`SELECT password_hash FROM users WHERE username = ${payload.u}`;
    const user = rows[0];
    if (!user || !verifyPassword(currentPassword, user.password_hash)) {
      res.status(401).json({ success: false, message: 'Password lama-nya salah.' });
      return;
    }

    await sql`UPDATE users SET password_hash = ${hashPassword(newPassword)} WHERE username = ${payload.u}`;
    await sql`DELETE FROM sessions WHERE username = ${payload.u} AND sid != ${payload.s}`;

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal terhubung ke database.' });
  }
};
