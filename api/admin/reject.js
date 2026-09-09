/**
 * POST /api/admin/reject { orderId } — marks a pending order as rejected
 * instead of approving it. Never deletes the row, so it stays visible in
 * Riwayat Terbaru for the admin's own record. No account is created and
 * no WhatsApp message is sent automatically — the admin does that by hand
 * if they want to tell the student why. Safe to click twice: an
 * already-processed order (approved or rejected) is a no-op.
 */
const { sql, ensureSchema } = require('../_db');
const { verifyToken, getBearerToken } = require('../_auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed.' });
    return;
  }

  const payload = verifyToken(getBearerToken(req));
  if (!payload || payload.r !== 'admin') {
    res.status(401).json({ success: false, message: 'Akses ditolak.' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  const orderId = String((body && body.orderId) || '').trim();
  if (!orderId) {
    res.status(400).json({ success: false, message: 'Missing orderId.' });
    return;
  }

  try {
    await ensureSchema();

    const orderRows = await sql`SELECT * FROM orders WHERE order_id = ${orderId}`;
    const order = orderRows[0];
    if (!order) {
      res.status(404).json({ success: false, message: 'Order tidak ditemukan.' });
      return;
    }
    if (order.status !== 'pending') {
      res.status(200).json({ success: true, alreadyProcessed: true, message: 'Order ini sudah diproses sebelumnya.' });
      return;
    }

    await sql`UPDATE orders SET status = 'rejected', approved_at = now() WHERE order_id = ${orderId}`;

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal memproses penolakan.' });
  }
};
