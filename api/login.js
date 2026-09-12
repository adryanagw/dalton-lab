/**
 * The student "account" endpoint — kept as one file/function (Vercel
 * Hobby plan caps a deployment at 12 Serverless Functions, so this
 * multiplexes on HTTP method instead of splitting into /api/settings,
 * /api/change-password, etc.):
 *
 * POST /api/login — verifies username/password against the users table in
 * Postgres, then mints a signed session token carrying the student's
 * subscription expiry. That token — not the password — is what every
 * method below, plus /api/content, /api/quiz, and /api/progress, require
 * on every request.
 *
 * Single active device per account: logging in on a new device
 * automatically signs out every other device on that account (their
 * session rows are deleted) instead of blocking the new login — the
 * student never has to manually sign out elsewhere first. Tokens are
 * stateless (see _auth.js) and not checked against the sessions table
 * per-request, so an evicted device's own token keeps working locally
 * until it naturally expires — this eviction is "sign in here frees the
 * slot," not a live kill-switch on the other tab.
 *
 * DELETE /api/login — logout. Deletes this device's session row. Uses
 * signature-only verification (not the full verifyToken expiry check) so
 * a student whose subscription has lapsed can still sign out instead of
 * being stuck occupying the slot until they renew. Always responds
 * success — signing out of an already-dead/invalid session isn't an
 * error from the client's point of view.
 *
 * GET /api/login — returns the logged-in student's own profile (personal
 * info collected for admin's KYC records; nama is admin-set, shown
 * read-only client-side).
 *
 * PUT /api/login — updates that personal info (email, whatsapp, sekolah,
 * kelas, tanggalLahir). No username in the body — the bearer token is the
 * only thing that decides which account gets written.
 *
 * PATCH /api/login — changes the student's own password. Requires the
 * current password (re-verified server-side) plus a new one, then evicts
 * every other active session for the account (same auto-evict mechanism
 * as login) so a changed password also signs out anyone else who might
 * have been using it elsewhere.
 */
const crypto = require('crypto');
const { sql, ensureSchema } = require('./_db');
const { verifyPassword, hashPassword } = require('./_password');
const { signToken, verifyToken, verifySignature, getBearerToken } = require('./_auth');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

module.exports = async function handler(req, res) {
  if (req.method === 'DELETE') {
    const payload = verifySignature(getBearerToken(req));
    if (payload && payload.u && payload.s) {
      try {
        await ensureSchema();
        await sql`DELETE FROM sessions WHERE username = ${payload.u} AND sid = ${payload.s}`;
      } catch (err) {
        // Non-critical — a later login on any device still evicts this
        // row via the auto-evict delete below, even if this delete fails.
      }
    }
    res.status(200).json({ success: true });
    return;
  }

  if (req.method === 'GET' || req.method === 'PUT' || req.method === 'PATCH') {
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

      // PATCH — change password
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { body = {}; }
      }
      const currentPassword = String((body && body.currentPassword) || '');
      const newPassword = String((body && body.newPassword) || '');

      if (!currentPassword || !newPassword) {
        res.status(400).json({ success: false, message: 'Password lama & baru wajib diisi.' });
        return;
      }
      if (newPassword.length < MIN_PASSWORD_LENGTH) {
        res.status(400).json({ success: false, message: `Password baru minimal ${MIN_PASSWORD_LENGTH} karakter.` });
        return;
      }

      const rows = await sql`SELECT password_hash FROM users WHERE username = ${payload.u}`;
      const user = rows[0];
      if (!user || !verifyPassword(currentPassword, user.password_hash)) {
        res.status(401).json({ success: false, message: 'Password lama-nya salah.' });
        return;
      }

      await sql`UPDATE users SET password_hash = ${hashPassword(newPassword)} WHERE username = ${payload.u}`;
      await sql`DELETE FROM sessions WHERE username = ${payload.u} AND sid != ${payload.s}`;
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Gagal terhubung ke database.' });
    }
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed.' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  const username = String((body && body.username) || '').trim().toLowerCase();
  const password = String((body && body.password) || '');

  if (!username || !password) {
    res.status(400).json({ success: false, message: 'Username & password wajib diisi.' });
    return;
  }

  try {
    await ensureSchema();

    const rows = await sql`SELECT username, password_hash, nama, expires_at FROM users WHERE username = ${username}`;
    const user = rows[0];

    if (!user || !verifyPassword(password, user.password_hash)) {
      res.status(401).json({ success: false, message: 'Username atau password salah.' });
      return;
    }

    // Auto-evict: a fresh login always wins, no manual sign-out elsewhere required.
    await sql`DELETE FROM sessions WHERE username = ${user.username}`;

    const expiresAt = user.expires_at ? new Date(user.expires_at).toISOString() : null;
    const sid = crypto.randomUUID();
    let token;
    try {
      token = signToken({ u: user.username, e: expiresAt, t: Date.now(), r: 'student', s: sid });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server belum siap (SESSION_SECRET belum di-set) — hubungi admin.' });
      return;
    }

    await sql`
      INSERT INTO sessions (username, sid, user_agent) VALUES (${user.username}, ${sid}, ${req.headers['user-agent'] || null})
    `;

    res.status(200).json({ success: true, nama: user.nama, expiresAt, token });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal terhubung ke database.' });
  }
};
