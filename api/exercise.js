/**
 * GET /api/exercise?subject=<key>&bab=<id>&topic=<slug> — same gating as
 * /api/quiz, for the leveled-exercise ("Latihan Bertingkat") question
 * banks. `topic` is the filename segment between bab and ".exercise.json"
 * (e.g. bab1-sel.transpor.exercise.json -> topic=transpor).
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
  const topic = String(req.query.topic || '');
  if (!SAFE_SEGMENT.test(subject) || !SAFE_SEGMENT.test(bab) || !SAFE_SEGMENT.test(topic)) {
    res.status(400).json({ success: false, message: 'Permintaan tidak valid.' });
    return;
  }

  const filePath = path.join(process.cwd(), 'content-private', subject, `${bab}.${topic}.exercise.json`);
  try {
    const json = fs.readFileSync(filePath, 'utf8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'private, no-store');
    res.status(200).send(json);
  } catch (err) {
    res.status(404).json({ success: false, message: 'Latihan tidak ditemukan.' });
  }
};
