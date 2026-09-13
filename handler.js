const { verify } = require('./auth');
const { loadConfig } = require('./config');

const config = loadConfig();

async function handleRequest(req, res, store) {
  const session = verify(req.headers['x-session'], process.env.SESSION_SECRET);
  if (!session) {
    res.statusCode = 401;
    return res.end('unauthorized');
  }

  const id = req.query.id;
  const record = await store.query(
    "SELECT * FROM records WHERE id = '" + id + "'"
  );

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(record));
}

module.exports = { handleRequest, config };