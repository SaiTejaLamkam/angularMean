'use strict';

var express = require('express');
var controller = require('./auth.controller');
var VerifyToken = require('../../verifyToken');

var router = express.Router();
router.post('/login', controller.userLogin);
router.post('/register', controller.userRegister);
router.get('/loggedUserData',VerifyToken, controller.loggedUserData);
router.get('/isLoggedIn',VerifyToken, controller.isLoggedIn);
router.get('/logout',VerifyToken, controller.logout);
router.post('/updateUserQuote',VerifyToken, controller.updateUserQuote);
module.exports = router;