require("dotenv").config();
const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "dmd",
  password: "asad8445569754",
});

module.exports = pool.promise();
