const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'vaishali',
    password: 'vaishali@1234',
    database: 'registeruser'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

module.exports = db;


// this is my database file 
// i am trying to connect database to server here 