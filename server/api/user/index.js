'use strict';

var express = require('express');
var controller = require('./user.controller');
var VerifyToken = require('../../verifyToken');

var router = express.Router();
router.post('/searchUser',VerifyToken, controller.searchUser);
// router.post('/sendFriendRequest',VerifyToken, controller.sendRequest)
module.exports = router;