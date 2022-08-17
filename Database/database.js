const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    database: "league",
    user: "root",
    password: "kapone2000",
});

connection.connect((error) => {
    if (error) {
        throw error;
    }
    console.log("MySQL database is connected successfully!");
});

module.exports = connection;