/**
 * PUT /api/admin/packages { packages: [{id, label, hari, harga, note}, ...] }
 * — bulk-updates package pricing. Only existing package ids (p30/p90/p365)
 * are updated; this endpoint never creates or removes a package tier.
 * Orders already placed keep their own snapshotted `harga` from order
 * time (see api/order.js), so changing a price here never rewrites the
 * amount a student already agreed to pay.
 */
const { sql, ensureSchema } = require('../_db');
const { verifyToken, getBearerToken } = require('../_auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'PUT') {
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
  const packages = Array.isArray(body && body.packages) ? body.packages : [];
  if (!packages.length) {
    res.status(400).json({ success: false, message: 'Data paket kosong.' });
    return;
  }

  const clean = [];
  for (const p of packages) {
    const id = String((p && p.id) || '').trim();
    const label = String((p && p.label) || '').trim();
    const hari = Number(p && p.hari);
    const harga = Number(p && p.harga);
    const note = String((p && p.note) || '').trim();
    if (!id || !label || !Number.isInteger(hari) || hari <= 0 || !Number.isInteger(harga) || harga <= 0) {
      res.status(400).json({ success: false, message: `Data paket "${id || '?'}" tidak valid.` });
      return;
    }
    clean.push({ id, label, hari, harga, note });
  }

  try {
    await ensureSchema();
    for (const p of clean) {
      await sql`
        UPDATE packages SET label = ${p.label}, hari = ${p.hari}, harga = ${p.harga}, note = ${p.note}
        WHERE id = ${p.id}
      `;
    }
    const updated = await sql`SELECT id, label, hari, harga, note FROM packages ORDER BY sort_order ASC`;
    res.status(200).json({ success: true, packages: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal menyimpan harga paket.' });
  }
};
