const User = require('./auth.modal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.userLogin = async function (req, res) {
	const { email, password } = req.body;
	const resp = await User.findOne({ email })
	if (!resp) {
		res.json({
			success: false,
			message: "Wrong Credentials"
		})
	} else {
		const decryptPwd = bcrypt.compare(password, resp.password);
		if (decryptPwd) {
			const JWTToken = jwt.sign({
				email: resp.email,
				_id: resp._id
			},
				req.app.get('superSecret'),
				{
					expiresIn: '2h'
				});
			res.json({
				success: true,
				token: JWTToken,
				message: "Successfully Logged In"
			});
			req.session.user = email
			req.session.save()
		}else{
			res.status(401).json({
				failed: 'Unauthorized Access'
			});
		}

	}
};

exports.userRegister = async function (req, res) {
	console.log(req.body, '----');
	const { username, email, password } = req.body;
	const paswdHash = await bcrypt.hash(password, 10);
	if(paswdHash){
		const existingUser = await User.findOne({ email })
			if (existingUser) {
				res.json({
					success: false,
					message: "Email Already Existed"
				})

				return
			}
			const user = new User({
				userName: username,
				email: email,
				password:paswdHash
			})
			const resp = await user.save()
			res.json({
				success: true,
				message: "Welcome"
			})
			req.session.user = email
			req.session.save()
	}else{
		res.status(500).json({
			error: err
		});
	}
};




exports.loggedUserData = async function (req, res) {
	const user = await User.findOne({ email: req.session.user })
	console.log(user, '********');
	if (!user) {
		res.json({
			status: false,
			message: 'No User'
		})
		return
	}

	res.json({
		status: true,
		email: req.session.user,
		quote : user.quote,
		profilePic: user.profilePic,
		userName: user.userName,
		userId: user._id
	})
}


exports.isLoggedIn = async function (req, res) {
	res.json({
		status: !!req.session.user
	})
}

exports.logout = async function (req, res) {
	req.session.destroy()
	res.json({
		success: true
	})
}


exports.updateUserQuote = async function (req, res) {
	const user = await User.findOne({ email: req.session.user })
	if (!user) {
		res.json({
			success: false,
			message: 'No User'
		})
		return
	}

	await User.update({ email: req.session.user }, { $set: { quote: req.body.value } })
	res.json({
		success: true
	})
}