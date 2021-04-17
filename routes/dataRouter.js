const express = require('express');
const dataRouter = express.Router();
const conn = require('./mysqlconn');
const cors = require('cors');

const poiControl = require('../controllers/poi');

dataRouter.use(cors());

dataRouter.get('/poi/find/:region', (req, res) => {
		conn.query(`SELECT * FROM pointsofinterest WHERE region=?`, [req.params.region], 
		(error, results, fields) => {
				if (error) {
						res.status(500).json({error:error});
				} else {
						res.json(results);
				}
		});
});

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
