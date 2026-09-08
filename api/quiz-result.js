/**
 * POST /api/quiz-result — logs one quiz or leveled-exercise attempt.
 * Username comes from the verified token (not the client body) so
 * results can't be forged under someone else's name; nama/kelas are the
 * values the student typed into the gate, kept as free text same as
 * before. topik/level are optional — set only by the leveled-exercise
 * engine ("Latihan Bertingkat"), null for the plain chapter quiz.
 */
const { sql, ensureSchema } = require('./_db');
const { verifyToken, getBearerToken } = require('./_auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed.' });
    return;
  }

  const payload = verifyToken(getBearerToken(req));
  if (!payload || payload.r !== 'student') {
    res.status(401).json({ success: false, message: 'Akses ditolak.' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  const subject = String((body && body.subject) || '');
  const babId = String((body && body.babId) || '');
  const nama = String((body && body.nama) || '');
  const kelas = String((body && body.kelas) || '');
  const skor = Number((body && body.skor) || 0);
  const total = Number((body && body.total) || 0);
  const persentase = Number((body && body.persentase) || 0);
  const topik = body && body.topik ? String(body.topik) : null;
  const level = body && body.level ? String(body.level) : null;

  if (!subject || !babId || !total) {
    res.status(400).json({ success: false, message: 'Data kuis tidak lengkap.' });
    return;
  }

  try {
    await ensureSchema();
    await sql`
      INSERT INTO quiz_results (username, nama, kelas, subject, bab_id, skor, total, persentase, topik, level)
      VALUES (${payload.u}, ${nama}, ${kelas}, ${subject}, ${babId}, ${skor}, ${total}, ${persentase}, ${topik}, ${level})
    `;
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal menyimpan hasil kuis.' });
  }
};
