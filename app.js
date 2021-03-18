const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());
const PORT=process.env.port;
// app.set("view engine", "ejs");


const connect = mysql.createConnection({
		host: 'localhost',
		user: 'mysql',
		password: process.env.pass,
		database: 'mysql'
});

connect.connect ( e => {
		if (e) {
				console.log(`Error ${e} has occured`);
		} else {
				console.log('Connected Successfully');

				app.get('/map/:lat/:lon', (req, res) => {
						console.log(`/map GET method, ${req.params.lat}, ${req.params.lon}`)
				});

				app.post('/map/add', (res, res) => {
					console.log(`/map/add POST method, ${req.body.title}`)
				});

				app.listen(PORT);
				console.log(`App is running at http://localhost:${PORT}`)
		}
});
