const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./controllers/users');
const conn = require('./controllers/mysqlconn');
require('dotenv').config(); 

app.use(bodyParser.json());
app.use(cors());
const SERVER_PORT=process.env.port;

// own middleware
app.use('/user', (req, res, next) => {
		console.log(`Received a request in time ${Date.now()} ms.`);
		next();
});

app.get('/poi/:region', (req, res) => {
		console.log('POT GET');
});

app.post('/poi/add', (req, res) => {
		console.log('POI ADD POST ');
});

app.get('poi/reccomend/:region', (req, res) => {
		console.log('POT RECCOMENDATION GET');
});

// home page
app.get('/', (req, res) => {
		res.send("Home");
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
