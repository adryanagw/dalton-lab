/**
 * GET /api/admin/orders — lists orders for the admin panel: pending ones
 * first (oldest first, so the queue reads top-to-bottom), then the most
 * recent already-approved ones for context. Requires an admin token.
 */
const { sql, ensureSchema } = require('../_db');
const { verifyToken, getBearerToken } = require('../_auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ success: false, message: 'Method not allowed.' });
    return;
  }

  const payload = verifyToken(getBearerToken(req));
  if (!payload || payload.r !== 'admin') {
    res.status(401).json({ success: false, message: 'Akses ditolak.' });
    return;
  }

  try {
    await ensureSchema();
    const pending = await sql`
      SELECT order_id, username, nama, whatsapp, paket, durasi_hari, harga, status, created_at
      FROM orders WHERE status = 'pending' ORDER BY created_at ASC
    `;
    const recent = await sql`
      SELECT order_id, username, nama, whatsapp, paket, durasi_hari, harga, status, created_at, approved_at, new_password
      FROM orders WHERE status != 'pending' ORDER BY created_at DESC LIMIT 25
    `;
    res.status(200).json({ success: true, pending, recent });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal terhubung ke database.' });
  }
};
