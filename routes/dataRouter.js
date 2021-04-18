const express = require('express');
const dataRouter = express.Router();
const conn = require('./mysqlconn');
const cors = require('cors');

const poiControl = require('../controllers/poi');

dataRouter.use(cors());

// works
//dataRouter.get('/poi/find0/:region', (req, res) => {
//		conn.query(`SELECT * FROM pointsofinterest WHERE region=?`, [req.params.region], 
//		(error, results, fields) => {
//				if (error) {
//						res.status(500).json({error:error});
//				} else {
//						res.json(results);
//				}
//		});
//});

dataRouter.get('/poi/find/:region', poiControl.search);

dataRouter.post('/poi/:id/recommend', poiControl.recommend);

dataRouter.get('/poi/recent', poiControl.recent);

dataRouter.post('poi/add', poiControl.add);

// change, currently works for ejs
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
