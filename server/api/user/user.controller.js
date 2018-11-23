const User = require('../auth/auth.modal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.searchUser = async function (req, res) {
	// console.log(req.body, '++++++++++++');
	
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
		
	// const { email, password } = req.body;
	// const resp = await User.findOne({ email })
	// if (!resp) {
	// 	res.json({
	// 		success: false,
	// 		message: "Wrong Credentials"
	// 	})
	// } else {
	// 	const decryptPwd = bcrypt.compare(password, resp.password);
	// 	if (decryptPwd) {
	// 		const JWTToken = jwt.sign({
	// 			email: resp.email,
	// 			_id: resp._id
	// 		},
	// 			req.app.get('superSecret'),
	// 			{
	// 				expiresIn: '2h'
	// 			});
	// 		res.json({
	// 			success: true,
	// 			token: JWTToken,
	// 			message: "Successfully Logged In"
	// 		});
	// 		req.session.user = email
	// 		req.session.save()
	// 	}else{
	// 		res.status(401).json({
	// 			failed: 'Unauthorized Access'
	// 		});
	// 	}

	// }
};

