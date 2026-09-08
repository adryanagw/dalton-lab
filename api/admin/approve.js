/**
 * POST /api/admin/approve { orderId } — the one-click replacement for the
 * old "edit Status to approved in the Sheet" workflow. Creates the user
 * account if it doesn't exist yet (random password, returned once so the
 * admin can relay it via WhatsApp) or extends an existing one's expiry,
 * stacking on top of any remaining active days rather than overwriting
 * them. Safe to click twice: an already-approved order is a no-op.
 */
const { sql, ensureSchema } = require('../_db');
const { verifyToken, getBearerToken } = require('../_auth');
const { hashPassword, randomPassword } = require('../_password');

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
    res.status(500).json({ success: false, message: 'Gagal memproses approval.' });
  }
};
