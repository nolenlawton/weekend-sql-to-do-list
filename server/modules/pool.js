const pg = require("pg");

const pool = new pg.Pool({
  database: "koala_db",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
