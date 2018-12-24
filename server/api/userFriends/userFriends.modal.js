const mongoose = require('mongoose')

const UserFriendsSchema = new mongoose.Schema({
	MainUserId:{
        type: Schema.Types.ObjectId,
        ref : 'User',
        required: true
},
FriendUserId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
},
AddedDate:{
        type: Date,
        default: Date.now
},
Accepted:{
        type: Boolean,
        default: false
},
AcceptedAt:{
        type: Date
},
Status:{
    type:String,
    default:"Pending"
},
isFriend:{
        type: Boolean,
        default: true
},
RequestStatus:{
    type: Boolean,
    default: true
},
Blockedby:{
    type: Schema.Types.ObjectId,
    ref: 'User'
},
BlockedByOther:{
    type: Schema.Types.ObjectId,
    ref: 'User'
},
BothBlocked:{
    type: Boolean,
    default: false
}
})

const UserFriends = mongoose.model('UserFriends',UserFriendsSchema)

module.exports = User