const fs = require('fs');
const path = require('path');

const DEFAULTS = {
  port: 8080,
  logLevel: 'info',
  allowedOrigins: ['https://example.com']
};

function loadConfig(configPath) {
  const resolved = path.join(__dirname, '..', configPath || 'config.json');
  if (!fs.existsSync(resolved)) return DEFAULTS;
  const raw = fs.readFileSync(resolved, 'utf8');
  return Object.assign({}, DEFAULTS, JSON.parse(raw));
}

module.exports = { loadConfig, DEFAULTS };