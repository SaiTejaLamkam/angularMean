const User = require('../auth/auth.modal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.searchUser = async function (req, res) {
	const resp = await User.find({$or:[{ name: {'$regex': req.body.userNm,$options:'i'} }, { userName: {'$regex': req.body.userNm,$options:'i'} }]}, { password: 0 });
		console.log(resp, '----------');
		if(resp.length > 0) {
			resp.forEach(function (value) {
				value.name = value.name.toLowerCase()
				.split(' ')
				.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
				.join(' ');
			  });

			  res.json({
				success: true,
				users: resp
			})
		} else if(resp.length == 0) {
			res.json({
				success: true,
				users: resp,
				message: 'No users'
			})
		} else{
			res.json({
				success: false,
				users: [],
				message: 'Failed'
			})
		}
};

// exports.sendRequest = async function (req, res) {
// 	console.log(req.body, '))))))))))))))))')
// };

