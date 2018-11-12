const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	userName: {type:String, required: true},
	email: {type:String, required: true},
	password: {type:String, required: true},
	quote : {type:String,default:'your quote'},
	profilePic: {}
})

const User = mongoose.model('User',UserSchema)

module.exports = User