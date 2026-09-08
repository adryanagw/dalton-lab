/**
 * Password hashing via Node's built-in scrypt — no external dependency
 * (bcrypt would need a native/npm build step). Replaces the plaintext
 * passwords the old Apps Script Users sheet stored.
 */
const crypto = require('crypto');

const KEY_LEN = 64;

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(String(password), salt, KEY_LEN).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  if (!stored || stored.indexOf(':') === -1) return false;
  const [salt, hashHex] = stored.split(':');
  const expected = Buffer.from(hashHex, 'hex');
  const actual = crypto.scryptSync(String(password), salt, KEY_LEN);
  if (expected.length !== actual.length) return false;
  return crypto.timingSafeEqual(expected, actual);
}

function randomPassword() {
  return crypto.randomBytes(6).toString('base64url'); // ~8 chars, URL/typing-safe
}

module.exports = { hashPassword, verifyPassword, randomPassword };
