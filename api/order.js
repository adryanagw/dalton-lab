/**
 * POST /api/order — records a package purchase request. Public endpoint
 * (no auth) — a student doesn't need to be logged in yet to buy a package,
 * since buying one can also be how they get an account in the first place.
 * Lands as a 'pending' row for the admin to approve at /admin.html.
 */
const { sql, ensureSchema } = require('./_db');

function generateOrderId() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta', year: '2-digit', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }).formatToParts(now).reduce((acc, p) => { acc[p.type] = p.value; return acc; }, {});
  return `DL${parts.year}${parts.month}${parts.day}${parts.hour}${parts.minute}${parts.second}`;
}

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
  const nama = String((body && body.nama) || '').trim();
  const whatsapp = String((body && body.whatsapp) || '').trim();
  const paket = String((body && body.paket) || '').trim();
  const durasiHari = Number((body && body.durasiHari) || 0);
  const harga = Number((body && body.harga) || 0);

  if (!username || !nama || !whatsapp || !paket || !durasiHari) {
    res.status(400).json({ success: false, message: 'Data pesanan tidak lengkap.' });
    return;
  }

  try {
    await ensureSchema();
    const orderId = generateOrderId();
    await sql`
      INSERT INTO orders (order_id, username, nama, whatsapp, paket, durasi_hari, harga, status)
      VALUES (${orderId}, ${username}, ${nama}, ${whatsapp}, ${paket}, ${durasiHari}, ${harga}, 'pending')
    `;
    res.status(200).json({ success: true, orderId });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal menyimpan pesanan. Coba lagi ya.' });
  }
};
