const express = require('express');
const routes = express.Router();
const conn = require('./mysqlconn');

routes.get('/user/:text', (req, res) => {
		res.send(`user directory from router`);
});


module.exports = routes;
