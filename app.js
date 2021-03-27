const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require(./controllers/users);
const conn = require('./controllers/mysqlconn');
// require('dotenv').config(); no .env file in this dir

app.use(bodyParser.json());
app.use(cors());
const SERVERPORT=process.env.port;

// own middleware
app.use('*', (req, res, next) => {
		console.log(`Received a request from / at ${Date.now()}.`);
		next();
});

app.get('gettest/:text', (req, res) => {
		res.send(`Get Method Entered TEXT: ${req.params.text}`);	
});

app.post('posttest', (req, res) => {
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

console.log(`Server is running on ${SERVERPORT}`);
app.listen(SERVERPORT);
