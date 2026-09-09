/**
 * GET /api/admin/orders — lists orders for the admin panel: pending ones
 * first (oldest first, so the queue reads top-to-bottom), then the most
 * recent already-approved/rejected ones for context. Requires an admin
 * token.
 *
 * POST /api/admin/orders { orderId, action: 'approve' | 'reject' } —
 * processes a pending order. 'approve' is the one-click replacement for
 * the old "edit Status to approved in the Sheet" workflow: creates the
 * user account if it doesn't exist yet (random password, returned once so
 * the admin can relay it via WhatsApp) or extends an existing one's
 * expiry, stacking on top of any remaining active days rather than
 * overwriting them. 'reject' marks the order rejected without creating an
 * account or sending anything automatically — the admin does that by hand
 * if they want to tell the student why; the row stays visible in Riwayat
 * Terbaru either way. Both actions are safe to click twice: an
 * already-processed order is a no-op.
 */
const { sql, ensureSchema } = require('../_db');
const { verifyToken, getBearerToken } = require('../_auth');
const { hashPassword, randomPassword } = require('../_password');

module.exports = async function handler(req, res) {
  const payload = verifyToken(getBearerToken(req));
  if (!payload || payload.r !== 'admin') {
    res.status(401).json({ success: false, message: 'Akses ditolak.' });
    return;
  }

  if (req.method === 'GET') {
    try {
      await ensureSchema();
      const pending = await sql`
        SELECT order_id, username, nama, whatsapp, email, paket, durasi_hari, harga, status, created_at
        FROM orders WHERE status = 'pending' ORDER BY created_at ASC
      `;
      const recent = await sql`
        SELECT order_id, username, nama, whatsapp, email, paket, durasi_hari, harga, status, created_at, approved_at, new_password
        FROM orders WHERE status != 'pending' ORDER BY created_at DESC LIMIT 25
      `;
      res.status(200).json({ success: true, pending, recent });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Gagal terhubung ke database.' });
    }
    return;
  }

  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { body = {}; }
    }
    const orderId = String((body && body.orderId) || '').trim();
    const action = String((body && body.action) || '').trim();
    if (!orderId || (action !== 'approve' && action !== 'reject')) {
      res.status(400).json({ success: false, message: 'Missing orderId or invalid action.' });
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

      if (action === 'reject') {
        await sql`UPDATE orders SET status = 'rejected', approved_at = now() WHERE order_id = ${orderId}`;
        res.status(200).json({ success: true });
        return;
      }

      const newPasswordPlain = randomPassword();
      const newPasswordHash = hashPassword(newPasswordPlain);

      const userRows = await sql`
        INSERT INTO users (username, password_hash, nama, expires_at)
        VALUES (${order.username}, ${newPasswordHash}, ${order.nama}, now() + make_interval(days => ${order.durasi_hari}))
        ON CONFLICT (username) DO UPDATE
          SET expires_at = GREATEST(users.expires_at, now()) + make_interval(days => ${order.durasi_hari})
        RETURNING username, expires_at, (xmax = 0) AS inserted
      `;
      const userResult = userRows[0];
      const isNewAccount = userResult.inserted;

      await sql`
        UPDATE orders
        SET status = 'approved', approved_at = now(), new_password = ${isNewAccount ? newPasswordPlain : null}
        WHERE order_id = ${orderId}
      `;

      res.status(200).json({
        success: true,
        username: userResult.username,
        expiresAt: userResult.expires_at,
        newAccount: isNewAccount,
        newPassword: isNewAccount ? newPasswordPlain : null
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Gagal memproses order.' });
    }
    return;
  }

  res.status(405).json({ success: false, message: 'Method not allowed.' });
};
