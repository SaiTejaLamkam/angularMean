const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	firstName: {type:String, required: false},
	lastName: {type:String, required: false},
	name: {type:String, required: false},
	userName: {type:String, required: true},
	email: {type:String, required: true},
	password: {type:String, required: true},
	quote : {type:String,default:'your quote'},
	profilePic: {},
	phone: {type: String,required: false,min: 10,max: 13},
	mobileNo: {type: String,required: false,min: 10,max: 13},
	location: {type: String,required: false},
	status: {type: Boolean, default: true}
})

const User = mongoose.model('User',UserSchema)

module.exports = User