const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/users');
const conn = require('./routes/mysqlconn');
require('dotenv').config(); 

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
app.set("view engine", "ejs");
const SERVER_PORT=process.env.port;

// own middleware
app.use('/user', (req, res, next) => {
		console.log(`Received a request in time ${Date.now()} ms.`);
		next();
});


app.get('/poi/find/:region', (req, res) => {
		conn.query(`SELECT * FROM pointsofinterest WHERE region=?`, [req.params.region], 
		(error, results, fields) => {
				if (error) {
						res.status(500).json({error:error});
				} else {
						res.json(results);
				}
		});
});

app.post('/poi/add', (req, res) => {
		conn.query(`INSERT INTO pointsofinterest(ID, name, type, country, region, lon, lat, description) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, [req.body.ID, req.body.name, req.body.type, req.body.country, req.body.region, req.body.lon, req.body.lat, req.body.description], 
		(error, results, fields) => {
				if (error) {
						res.status(500).json({error:error});
				} else {
						res.json({success});
				}
		});
});

app.post('poi/:id/recommend', (req, res) => {
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

//				app.get('/map/:lat/:lon', (req, res) => {
//						console.log(`/map GET method, ${req.params.lat}, ${req.params.lon}`)
//				});
//
//				app.post('/map/add', (res, res) => {
//					console.log(`/map/add POST method, ${req.body.title}`)
//				});
//
//				app.listen(PORT);
//				console.log(`App is running at http://localhost:${PORT}`)
//});

console.log(`Server is running on http://localhost:8080`);
app.listen(8080);

//console.log(`Server is running on http://localhost:${SERVER_PORT}`);
//app.listen(SERVER_PORT);
