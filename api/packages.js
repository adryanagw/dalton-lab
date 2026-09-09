/**
 * GET /api/packages — public, no auth. Returns the current package
 * pricing (admin-editable from admin.html) so the storefront never
 * ships stale hardcoded prices.
 */
const { sql, ensureSchema } = require('./_db');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ success: false, message: 'Method not allowed.' });
    return;
  }

  try {
    await ensureSchema();
    const packages = await sql`
      SELECT id, label, hari, harga, note
      FROM packages ORDER BY sort_order ASC
    `;
    res.status(200).json({ success: true, packages });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal memuat paket.' });
  }
};
