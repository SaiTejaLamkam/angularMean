const User = require('../auth/auth.modal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.searchUser = async function (req, res) {
	console.log(req.body, '++++++++++++');
		res.json({
			success: true,
			users: [{name:'Sai Teja', id: '8686150884'}]
		})
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

