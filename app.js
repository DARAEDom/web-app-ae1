const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const ejs = require("ejs");

const serverPort=process.env.SERVER_PORT;
const conn = require('./routes/mysqlconn');
const routes = require('./routes/users');
const dataRouter = require('./routes/dataRouter');

require('dotenv').config(); 
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); 
app.use(express.urlencoded({extended: true}));

// own middleware
//app.use('/user', (req, res, next) => {
//		console.log(`Received a request in time ${Date.now()} ms.`);
//		next();
//});

app.get('/home', (req, res) => {
		conn.query(`SELECT * FROM pointsofinterest ORDER BY ID LIMIT 10`, 
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

app.get('/poi/find/:region', (req, res) => {
		conn.query(`SELECT * FROM pointsofinterest WHERE region=?`, [req.params.region], 
		(error, results, fields) => {
				if (error) {
						res.status(500).json({error:error});
				} else {
						res.json(
								results
						);
				}
		});
});


//app.get('/poi/find/:region', (req, res) => {
//		conn.query(`SELECT * FROM pointsofinterest WHERE region=?`, [req.params.region], 
//		(error, results, fields) => {
//				if (error) {
//						res.status(500).json({error:error});
//				} else {
//						res.json(results);
//				}
//		});
//});

app.post('/poi/add', (req, res) => {
		console.log(req.params.name);
		conn.query(`INSERT INTO pointsofinterest( name, type, country, region, lon, lat, description) VALUES(?, ?, ?, ?, ?, ?, ?)`, [req.body.name, req.body.type, req.body.country, req.body.region, req.body.lon, req.body.lat, req.body.description], 
		(error, results, fields) => {
				if (error) {
						res.status(500).json({error:error});
				} else {
						res.json({success:1});
				}
		});
});

app.post('/poi/:id/recommend', (req, res) => {
		conn.query(`UPDATE pointsofinterest SET recommendations=recommendations+1 WHERE id=?`, [req.params.id],
		(error, results, fields) => {
				if(error) {
						res.status(500).json({error:error});
				} else if(results.affectedRows==1) {
						res.json({'message': 'Recomendation sent!'});
				} else {
						res.status(404).json({error: 'ID not found!'});
				}
		});
});



// testing 
app.get('/user/:text' , (req, res) => {
		console.log(`Parameters: ${req.params.text}`);
});

app.get('/gettest/:text', (req, res) => {
		res.send(`Get Method Entered TEXT: ${req.params.text}`);	
});

app.post('/posttest', (req, res) => {
		res.send(`Post Method Entered Details: ${req.body.text}`);
})

app.use('/user', routes);

app.use('/poi', dataRouter);

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
