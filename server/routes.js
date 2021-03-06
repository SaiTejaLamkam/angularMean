'use strict';
var jwt = require('jsonwebtoken');

export default function (app) {
	// route middleware to verify a token
// 	app.use(function (req, res, next) {

// 		// check header or url parameters or post parameters for token
// 		var token = req.body.token || req.query.token || req.headers['authorization'];
// 		console.log(req.headers, '-------------');
// 		// decode token
// 		if (token) {
// console.log(token, '---------------');
// 			// verifies secret and checks exp
// 			jwt.verify(token, app.get('superSecret'), function (err, decoded) {
// 				if (err) {
// 					return res.json({ success: false, message: 'Failed to authenticate token.' });
// 				} else {
// 					// if everything is good, save to request for use in other routes
// 					req.decoded = decoded;
// 					next();
// 				}
// 			});

// 		} else {

// 			// if there is no token
// 			// return an error
// 			return res.status(403).send({
// 				success: false,
// 				message: 'No token provided.'
// 			});

// 		}
// 	});
	app.use('/api/auth', require('./api/auth'));
	app.use('/api/user', require('./api/user'));
	app.use('/api/userFriends', require('./api/userFriends'));
}


// module.exports = onload