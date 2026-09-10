/**
 * GET /api/admin/students — lists every student account with the
 * personal info (KYC) they've filled in from Settings, plus their
 * subscription status. Admin-only, read-only.
 */
const { sql, ensureSchema } = require('../_db');
const { verifyToken, getBearerToken } = require('../_auth');

module.exports = async function handler(req, res) {
  const payload = verifyToken(getBearerToken(req));
  if (!payload || payload.r !== 'admin') {
    res.status(401).json({ success: false, message: 'Akses ditolak.' });
    return;
  }
  if (req.method !== 'GET') {
    res.status(405).json({ success: false, message: 'Method not allowed.' });
    return;
  }

  try {
    await ensureSchema();
    const students = await sql`
      SELECT username, nama, email, whatsapp, sekolah, kelas, tanggal_lahir, expires_at, created_at
      FROM users ORDER BY created_at DESC
    `;
    res.status(200).json({ success: true, students });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal memuat data siswa.' });
  }
};
