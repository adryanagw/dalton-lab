/**
 * Shared session-token helpers for the /api serverless functions.
 * Tokens are minted only by /api/login and /api/admin/login (after
 * verifying credentials) and are self-contained: username/role + (for
 * students) the subscription's expiresAt, HMAC-signed with a
 * server-only secret so the browser can hold the token but never forge
 * or edit it.
 */
const crypto = require('crypto');

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET is not configured on this deployment.');
  return secret;
}

function b64url(buf) {
  return Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlToBuffer(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return Buffer.from(str, 'base64');
}

function signToken(payload) {
  const secret = getSecret();
  const payloadB64 = b64url(JSON.stringify(payload));
  const sig = crypto.createHmac('sha256', secret).update(payloadB64).digest();
  return payloadB64 + '.' + b64url(sig);
}

/**
 * Verifies signature only — no expiry check. Used only where a lapsed
 * subscription must not block the action (namely /api/logout: a student
 * whose token's embedded expiresAt has passed still needs to be able to
 * sign out and free their device slot for the 2-device cap, not get
 * stuck occupying it until they renew).
 */
function verifySignature(token) {
  if (!token || typeof token !== 'string' || token.indexOf('.') === -1) return null;

  let secret;
  try { secret = getSecret(); } catch (e) { return null; }

  const [payloadB64, sigB64] = token.split('.');
  if (!payloadB64 || !sigB64) return null;

  const expectedSig = crypto.createHmac('sha256', secret).update(payloadB64).digest();
  let providedSig;
  try { providedSig = b64urlToBuffer(sigB64); } catch (e) { return null; }
  if (providedSig.length !== expectedSig.length || !crypto.timingSafeEqual(expectedSig, providedSig)) return null;

  let payload;
  try { payload = JSON.parse(b64urlToBuffer(payloadB64).toString('utf8')); } catch (e) { return null; }
  if (!payload || !payload.u || !payload.e) return null;

  return payload;
}

/**
 * Verifies signature + expiry. Returns the decoded payload only when the
 * token is authentic AND the embedded expiry is still in the future —
 * this is the single choke point every protected endpoint calls before
 * it will hand back a chapter, quiz, exercise, or admin action.
 */
function verifyToken(token) {
  const payload = verifySignature(token);
  if (!payload) return null;
  if (new Date(payload.e).getTime() <= Date.now()) return null; // expired

  return payload; // { u: username, e: expiresAt ISO, t: issuedAt millis, r: 'student'|'admin', s: sessionId }
}

function getBearerToken(req) {
  const header = req.headers['authorization'] || '';
  const match = /^Bearer\s+(.+)$/i.exec(header);
  if (match) return match[1];
  return (req.query && req.query.token) || null;
}

module.exports = { signToken, verifyToken, verifySignature, getBearerToken };
