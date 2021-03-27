const mysql = require('mysql2');

require('dotenv').config();

const conn = mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB
});

conn.connect ( err => {
		if (err) {
				console.log(err);
				process.exit(1);
		} else {
				console.log(`Connected to the database ${process.env.DB}`);
		}
});
module.exports = conn; 
