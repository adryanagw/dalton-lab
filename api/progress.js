/**
 * GET /api/progress — returns { babId: 'started'|'completed', ... } for the
 * logged-in student (from their token — never trusts a client-supplied
 * username, so one student can't read or overwrite another's progress).
 * POST /api/progress { babId, status } — upserts one chapter's progress,
 * never downgrading 'completed' back to 'started'.
 */
const { sql, ensureSchema } = require('./_db');
const { verifyToken, getBearerToken } = require('./_auth');

module.exports = async function handler(req, res) {
  const payload = verifyToken(getBearerToken(req));
  if (!payload || payload.r !== 'student') {
    res.status(401).json({ success: false, message: 'Akses ditolak.' });
    return;
  }
  const username = payload.u;

  try {
    await ensureSchema();

    if (req.method === 'GET') {
      const rows = await sql`SELECT bab_id, status FROM progress WHERE username = ${username}`;
      const progress = {};
      rows.forEach(r => { progress[r.bab_id] = r.status; });
      res.status(200).json({ success: true, progress });
      return;
    }

    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { body = {}; }
      }
      const babId = String((body && body.babId) || '');
      const status = String((body && body.status) || 'started');
      if (!babId) {
        res.status(400).json({ success: false, message: 'Missing babId.' });
        return;
      }

      await sql`
        INSERT INTO progress (username, bab_id, status, updated_at)
        VALUES (${username}, ${babId}, ${status}, now())
        ON CONFLICT (username, bab_id) DO UPDATE
          SET status = CASE WHEN progress.status = 'completed' THEN 'completed' ELSE EXCLUDED.status END,
              updated_at = now()
      `;
      res.status(200).json({ success: true });
      return;
    }

    res.status(405).json({ success: false, message: 'Method not allowed.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal terhubung ke database.' });
  }
};
