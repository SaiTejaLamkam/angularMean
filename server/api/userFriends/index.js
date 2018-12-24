'use strict';

var express = require('express');
var controller = require('./userFriends.controller');
var VerifyToken = require('../../verifyToken');

var router = express.Router();

router.post('/sendFriendRequest',VerifyToken, controller.sendRequest)
module.exports = router;