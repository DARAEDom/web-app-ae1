const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const ejs = require("ejs");

const serverPort=process.env.SERVER_PORT;

require('dotenv').config(); 
const app = express();

app.use(bodyParser.json());
app.use(cors());
//app.use(corsMiddleware); to be tested
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); 
app.use(express.urlencoded({extended: true}));

const conn = require('./routes/mysqlconn');
const routes = require('./routes/users');
const dataRouter = require('./routes/dataRouter');

//const corsMiddleware = require('./routes/corsModule');

// own middleware
//app.use('/user', (req, res, next) => {
//		console.log(`Received a request in time ${Date.now()} ms.`);
//		next();
//});


app.use(routes);

app.use(dataRouter);

app.get('/home', (req, res) => {
		conn.query(`SELECT * FROM pointsofinterest ORDER BY ID DESC LIMIT 10`, 
				(error, results, fields) => {
						if (error) {
								res.status(500).json({error:error});
						} else {
								res.render('home', {
										root:results
								});
						}
				}
		);
});

console.log(`Server is running on http://localhost:${process.env.SERVER_PORT}/`);
app.listen(8080);

function checkJSON(json) {
	try {
			const jsonCheck = JSON.parse(json);

			if (jsonCheck && typeof jsonCheck === "object") {
					return jsonCheck;
		}
	} catch (e) {
			console.log(`Error: JSON Check failed ${e}`);
			return false;
	}
}

function multipleCheckJSON (params) {
	try {
			params.forEach(file => {
					const jsonCheck = JSON.parse(file);
					if (file && typeof file === "object") {
							return true;
					} else {
							return false;
					}
			});

	} catch (e) {
			console.log(`Error: JSON Check failed ${e}`);
			return false;
	}

}
