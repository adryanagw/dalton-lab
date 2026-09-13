/**
 * GET /api/pdf-download?subject=<key>&bab=<id>
 *
 * Serves one raw PDF file straight through for direct download — not
 * rasterized pages like /api/pdf-content, and no preview. Used for
 * supplementary PDFs (e.g. an answer key) that should only ever be
 * downloaded, never shown in the in-page viewer.
 *
 * The file on disk must be named exactly `<bab>.download.pdf` in
 * content-private/<subject>/. The filename is built server-side from
 * validated subject/bab segments only — `bab` is never used to open an
 * arbitrary path, so there's no path-traversal surface from user input.
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

  const filePath = path.join(process.cwd(), 'content-private', subject, `${bab}.download.pdf`);
  try {
    const buf = fs.readFileSync(filePath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Cache-Control', 'private, no-store');
    res.status(200).send(buf);
  } catch (err) {
    res.status(404).json({ success: false, message: 'File tidak ditemukan.' });
  }
};
