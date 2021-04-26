const express = require('express');
const userRoutes = express.Router();
const conn = require('./mysqlconn');

const expressSession = require('express-session');
const MySQLStore = require('express-mysql-session')(expressSession);
const sessionStore = new MySQLStore({ } , conn.promise());

userRoutes.post('/login', (req, res) => {
	console.log(`${req.body.username} Username, ${req.body.password} Password`);
	conn.query(`SELECT * FROM poi_users WHERE username = ? AND password = ?`, [req.body.username, req.body.password], 
	(error, results, fields) => {
		if(results.length > 0) {
			req.body.username = req.session.username;
			res.json({success: 1});
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

userRoutes.use(expressSession({
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
