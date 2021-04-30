const express = require('express');
const dataRouter = express.Router();
const conn = require('./mysqlconn');
const cors = require('cors');
const bodyParser = require('body-parser');
dataRouter.use(bodyParser.json());
dataRouter.use(express.urlencoded({extended: true}));

const poiControl = require('../controllers/poi');

dataRouter.use(cors());

dataRouter.get('/poi/find/:region', poiControl.search);

dataRouter.post('/poi/:id/recommend', poiControl.recommend);

dataRouter.post('/poi/add', poiControl.add);

dataRouter.get('/poi/recent', poiControl.recent);

dataRouter.post('/poi/review', poiControl.review);

dataRouter.get('/poi/home', (req, res) => {
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

module.exports = dataRouter;
