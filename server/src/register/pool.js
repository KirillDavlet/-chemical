const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "chimical",
    password: "pass"
});


module.exports = connection;