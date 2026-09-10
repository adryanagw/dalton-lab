/**
 * GET /api/settings — returns the logged-in student's own profile
 * (nama is admin-set and shown read-only; the rest is student-editable
 * personal info collected for admin's records).
 *
 * PUT /api/settings — updates that personal info. Auth via bearer token
 * (student role) identifies which account to write; there's no username
 * in the body, so a student can only ever edit their own row.
 */
const { sql, ensureSchema } = require('./_db');
const { verifyToken, getBearerToken } = require('./_auth');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async function handler(req, res) {
  const payload = verifyToken(getBearerToken(req));
  if (!payload || payload.r !== 'student') {
    res.status(401).json({ success: false, message: 'Sesi kamu habis, login ulang ya.' });
    return;
  }

  try {
    await ensureSchema();

    if (req.method === 'GET') {
      const rows = await sql`
        SELECT nama, username, email, whatsapp, sekolah, kelas, tanggal_lahir
        FROM users WHERE username = ${payload.u}
      `;
      const user = rows[0];
      if (!user) { res.status(404).json({ success: false, message: 'Akun tidak ditemukan.' }); return; }
      res.status(200).json({
        success: true,
        profile: {
          nama: user.nama,
          username: user.username,
          email: user.email || '',
          whatsapp: user.whatsapp || '',
          sekolah: user.sekolah || '',
          kelas: user.kelas || '',
          tanggalLahir: user.tanggal_lahir ? new Date(user.tanggal_lahir).toISOString().slice(0, 10) : ''
        }
      });
      return;
    }

    if (req.method === 'PUT') {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { body = {}; }
      }
      const email = String((body && body.email) || '').trim();
      const whatsapp = String((body && body.whatsapp) || '').trim();
      const sekolah = String((body && body.sekolah) || '').trim();
      const kelas = String((body && body.kelas) || '').trim();
      const tanggalLahirRaw = String((body && body.tanggalLahir) || '').trim();

      if (email && !EMAIL_RE.test(email)) {
        res.status(400).json({ success: false, message: 'Format email-nya belum bener.' });
        return;
      }
      let tanggalLahir = null;
      if (tanggalLahirRaw) {
        const d = new Date(tanggalLahirRaw);
        if (Number.isNaN(d.getTime())) {
          res.status(400).json({ success: false, message: 'Format tanggal lahir-nya belum bener.' });
          return;
        }
        tanggalLahir = tanggalLahirRaw;
      }

      await sql`
        UPDATE users SET
          email = ${email || null},
          whatsapp = ${whatsapp || null},
          sekolah = ${sekolah || null},
          kelas = ${kelas || null},
          tanggal_lahir = ${tanggalLahir}
        WHERE username = ${payload.u}
      `;
      res.status(200).json({ success: true });
      return;
    }

    res.status(405).json({ success: false, message: 'Method not allowed.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal terhubung ke database.' });
  }
};
