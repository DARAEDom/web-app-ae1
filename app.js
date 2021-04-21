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
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); 
app.use(express.urlencoded({extended: true}));

const conn = require('./routes/mysqlconn');
const routes = require('./routes/users');
const dataRouter = require('./routes/dataRouter');

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

//app.get('/poi/find/:region', (req, res) => {
//		conn.query(`SELECT * FROM pointsofinterest WHERE region=?`, [req.params.region], 
//		(error, results, fields) => {
//				if (error) {
//						res.status(500).json({error:error});
//				} else {
//						res.json(
//								results
//						);
//				}
//		});
//});

//app.get('/poi/find/recent/region', (req, res) => {
//		conn.query(`SELECT * FROM pointsofinterest WHERE region=? ORDER BY ID DESC LIMIT 10`, [req.params.region],
//		(error, results, fields) => {
//				if (error) {
//						res.status(500).json({error:error});
//				} else {
//						res.json(
//								results
//						);
//				}
//		});
//});

//app.post('/poi/add', (req, res) => {
	//	if (checkJSON(req.body.name)) {
	//			console.log(`poi/add Success`);
//		conn.query(`INSERT INTO pointsofinterest( name, type, country, region, lon, lat, description) VALUES(?, ?, ?, ?, ?, ?, ?)`, [req.body.name, req.body.type, req.body.country, req.body.region, req.body.lon, req.body.lat, req.body.description], 
//		(error, results, fields) => {
//				if (error) {
//						res.status(500).json({error:error});
//				} else {
//						res.json({success:1});
//				}
//		});
	//	} else {
	//			console.log(`poi/add Fail`);
	//	}
//});

//app.post('/poi/:id/recommend', (req, res) => {
//		conn.query(`UPDATE pointsofinterest SET recommendations=recommendations+1 WHERE id=?`, [req.params.id],
//		(error, results, fields) => {
//				if(error) {
//						res.status(500).json({error:error});
//				} else if(results.affectedRows==1) {
//						res.json({'message': 'Recomendation sent!'});
//				} else {
//						res.status(404).json({error: 'ID not found!'});
//				}
//		});
//});
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
