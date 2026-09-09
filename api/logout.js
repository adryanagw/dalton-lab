/**
 * POST /api/logout — frees this device's slot against the 2-device cap
 * (see api/login.js) by deleting its session row. Uses signature-only
 * verification (not the full verifyToken expiry check) so a student
 * whose subscription has lapsed can still sign out and free the slot
 * instead of being stuck occupying it until they renew. Always responds
 * success — signing out of an already-dead/invalid session isn't an
 * error from the client's point of view.
 */
const { sql, ensureSchema } = require('./_db');
const { verifySignature, getBearerToken } = require('./_auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed.' });
    return;
  }

  const payload = verifySignature(getBearerToken(req));
  if (payload && payload.u && payload.s) {
    try {
      await ensureSchema();
      await sql`DELETE FROM sessions WHERE username = ${payload.u} AND sid = ${payload.s}`;
    } catch (err) {
      // Non-critical — the session row will still auto-reclaim after
      // STALE_SESSION_DAYS if this delete didn't go through.
    }
  }

  res.status(200).json({ success: true });
};
