/**
 * GET /api/admin/sessions — lists every account that currently has a
 * logged-in device (normally at most one row each, since /api/login
 * auto-evicts other devices on a fresh sign-in) and when it logged in.
 *
 * GET /api/admin/sessions?resource=students — lists every student
 * account with the personal info (KYC) they've filled in from Settings.
 * Folded into this same file/function rather than a separate
 * /api/admin/students endpoint — Vercel's Hobby plan caps a deployment
 * at 12 Serverless Functions, so admin's read-only GET endpoints share a
 * file and multiplex on this query param instead of each getting one.
 *
 * POST /api/admin/sessions { username } — force-logout: deletes the
 * session row for that account. Note this does not retroactively kill an
 * already-open device's token in real time (tokens are stateless and
 * self-expire on their own per the subscription's expiresAt) — it just
 * lets a fresh login proceed cleanly; an existing open tab keeps working
 * until its own token naturally expires.
 */
const { sql, ensureSchema } = require('../_db');
const { verifyToken, getBearerToken } = require('../_auth');

module.exports = async function handler(req, res) {
  const payload = verifyToken(getBearerToken(req));
  if (!payload || payload.r !== 'admin') {
    res.status(401).json({ success: false, message: 'Akses ditolak.' });
    return;
  }

  try {
    await ensureSchema();

    if (req.method === 'GET' && req.query.resource === 'students') {
      const students = await sql`
        SELECT username, nama, email, whatsapp, sekolah, kelas, tanggal_lahir, expires_at, created_at
        FROM users ORDER BY created_at DESC
      `;
      res.status(200).json({ success: true, students });
      return;
    }

    if (req.method === 'GET') {
      const sessions = await sql`
        SELECT username, COUNT(*)::int AS device_count,
               MIN(created_at) AS oldest_login, MAX(created_at) AS newest_login
        FROM sessions
        GROUP BY username
        ORDER BY device_count DESC, newest_login DESC
      `;
      res.status(200).json({ success: true, sessions });
      return;
    }

    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { body = {}; }
      }
      const username = String((body && body.username) || '').trim().toLowerCase();
      if (!username) {
        res.status(400).json({ success: false, message: 'Missing username.' });
        return;
      }
      await sql`DELETE FROM sessions WHERE username = ${username}`;
      res.status(200).json({ success: true });
      return;
    }

    res.status(405).json({ success: false, message: 'Method not allowed.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal terhubung ke database.' });
  }
};
