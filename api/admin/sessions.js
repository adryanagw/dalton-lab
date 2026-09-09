/**
 * GET /api/admin/sessions — lists every account that currently has at
 * least one logged-in device, with a device count (against the 2-device
 * cap enforced at login) and when the oldest/newest of those devices
 * logged in.
 *
 * POST /api/admin/sessions { username } — force-logout: deletes every
 * session row for that account, freeing all its device slots for new
 * logins immediately. Note this does not retroactively kill an
 * already-open device's token in real time (tokens are stateless and
 * self-expire on their own per the subscription's expiresAt) — it frees
 * the slot so the student (or someone else, if the account was
 * compromised) can log in fresh; existing open tabs keep working until
 * their own token naturally expires.
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
    res.status(500).json({ success: false, message: 'Gagal memproses sesi.' });
  }
};
