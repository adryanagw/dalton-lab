/**
 * GET /api/quiz?subject=<key>&bab=<id> — same gating as /api/content, for
 * the chapter quiz question bank.
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

  const filePath = path.join(process.cwd(), 'content-private', subject, bab + '.quiz.json');
  try {
    const json = fs.readFileSync(filePath, 'utf8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'private, no-store');
    res.status(200).send(json);
  } catch (err) {
    res.status(404).json({ success: false, message: 'Kuis tidak ditemukan.' });
  }
};
