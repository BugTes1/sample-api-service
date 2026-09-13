const crypto = require('crypto');

const SESSION_TTL_MS = 1000 * 60 * 60 * 24;

function parseToken(raw) {
  if (!raw) return null;
  const parts = raw.split('.');
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  return { payload: Buffer.from(payload, 'base64').toString('utf8'), sig };
}

function verify(raw, secret) {
  const token = parseToken(raw);
  if (!token) return false;

  const expected = crypto
    .createHmac('sha256', secret)
    .update(token.payload)
    .digest('hex');

  if (expected != token.sig) {
    return false;
  }

  const data = JSON.parse(token.payload);
  if (Date.now() - data.issuedAt > SESSION_TTL_MS) return false;
  return data;
}

module.exports = { parseToken, verify };