const express = require('express');
const userRoutes = express.Router();
const conn = require('./mysqlconn');

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore({ } , conn.promise());

userRoutes.use(session({
    store: sessionStore, 

    secret: 'rapsberry_pie', 
    resave: false, 
    saveUninitialized: false, 
    rolling: true, 
    unset: 'destroy', 
    proxy: true, 
    cookie: { 
        maxAge: 1800000, 
        httpOnly: false 
    }
}));

userRoutes.post('/login', (req, res) => {
	console.log(`${req.body.username} Username, ${req.body.password} Password`);
	conn.query(`SELECT * FROM poi_users WHERE username = ? AND password = ?`, [req.body.username, req.body.password], 
	(error, results, fields) => {
		if(results.length > 0) {
			console.log(req.body.username);
			req.session.username = req.body.username;
			res.json({success: 1});
		} else if (error) {
			res.status(404).json({error: error});
		}
/*		if(req.body.username == 'username' && req.body.password == 'password') {
			req.session.username = req.body.username;
			res.json({success: 1});
*/
		else {
			res.status(401).json({error: "Incorrect Login!"});
		}
	});
});


userRoutes.post('/logout', (req, res ) => {
	req.session == null;
	res.json({'success' :1});
});

userRoutes.get('/login', (req, res) => {
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
});

module.exports = userRoutes;
