/**
 * GET /api/content?subject=<key>&bab=<id> — the only place chapter HTML
 * is ever served from. Files live in /content-private, which is outside
 * the public/ output directory Vercel serves as static assets, so this
 * endpoint is the sole path to them: no valid, unexpired student token
 * means no content, full stop.
 */
const fs = require('fs');
const path = require('path');
const { verifyToken, getBearerToken } = require('./_auth');

const SAFE_SEGMENT = /^[a-z0-9-]+$/;

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ success: false, message: 'Method not allowed.' });
    return;
  }

  const payload = verifyToken(getBearerToken(req));
  if (!payload || payload.r !== 'student') {
    res.status(401).json({ success: false, message: 'Akses ditolak — login & paket aktif diperlukan.' });
    return;
  }

  const subject = String(req.query.subject || '');
  const bab = String(req.query.bab || '');
  if (!SAFE_SEGMENT.test(subject) || !SAFE_SEGMENT.test(bab)) {
    res.status(400).json({ success: false, message: 'Permintaan tidak valid.' });
    return;
  }

  const filePath = path.join(process.cwd(), 'content-private', subject, bab + '.html');
  try {
    const html = fs.readFileSync(filePath, 'utf8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'private, no-store');
    res.status(200).send(html);
  } catch (err) {
    res.status(404).json({ success: false, message: 'Materi tidak ditemukan.' });
  }
};
