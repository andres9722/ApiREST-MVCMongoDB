'use strict';

const UserController = require('../controllers/user-controller'),
	express = require('express'),
	router = express.Router(),
	uc = new UserController();

router
	.get('/', uc.index)
	.get('/login', uc.logInGet) 
	.post('/login', uc.logInPost)
	.get('/signin', uc.signInGet)
	.post('/signin', uc.signInPost)
	.get('/logout', uc.logOut);
	
module.exports = router;