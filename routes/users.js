const express = require('express');
const userRoutes = express.Router();
const conn = require('./mysqlconn');

userRoutes.post('/login', (req, res) => {
	if(req.body.username == 'username' && req.body.password == 'password') {
		req.session.username = req.body.username;
		res.json({success: 1});
	} else {
		res.status(401).json({error: "Incorrect Login!"});
	}
});

userRoutes.post('/logout', (req, res ) => {
	req.session == null;
	res.json({'success' :1});
});

userRoutes.get('/login' (req, res) => {
	res.json({username: req.session.username || null});
});

userRoutes.use((req, res, next) => {
	if(["POST", "DELETE"].indexOf(req.method) == -1) {
		next();	
	} else {
		if(req.session.username) {
			next();
		} else {
			res.status(401).json({error: "You are not logged in!"});
		}
	}

);
});

module.exports = userRoutes;
