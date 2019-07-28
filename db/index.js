const pg = require('pg');

exports.pool = pg.Pool({
  host: 'env_host',
  database: 'env_db',
  user: 'env_user',
  port: 5432,
  password: 'env_pass',
});