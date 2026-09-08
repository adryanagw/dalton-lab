/**
 * POST /api/admin/login — a single shared admin password (ADMIN_PASSWORD
 * env var), checked with a constant-time comparison. On success, mints a
 * 12-hour admin token using the same signing scheme as student tokens
 * (see ../_auth.js), distinguished by role 'admin'.
 */
const crypto = require('crypto');
const { ensureSchema } = require('../_db');
const { signToken } = require('../_auth');

const ADMIN_SESSION_HOURS = 12;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed.' });
    return;
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    res.status(500).json({ success: false, message: 'ADMIN_PASSWORD belum di-set di Vercel.' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  const password = String((body && body.password) || '');

  const provided = Buffer.from(password);
  const expected = Buffer.from(adminPassword);
  const matches = provided.length === expected.length && crypto.timingSafeEqual(provided, expected);
  if (!matches) {
    res.status(401).json({ success: false, message: 'Password salah.' });
    return;
  }

  try {
    await ensureSchema();
  } catch (err) {
    // Non-fatal for login itself — surfaced properly once the orders list is fetched.
  }

  let token;
  try {
    token = signToken({
      u: 'admin',
      e: new Date(Date.now() + ADMIN_SESSION_HOURS * 60 * 60 * 1000).toISOString(),
      t: Date.now(),
      r: 'admin'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'SESSION_SECRET belum di-set di Vercel.' });
    return;
  }

  res.status(200).json({ success: true, token });
};
