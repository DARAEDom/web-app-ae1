const express = require('express');
const routes = express.Router();
const conn = require('./mysqlconn');

routes.get('/user', (req, res) => {
		res.send(`user directory from router`);
});


module.exports = routes;
