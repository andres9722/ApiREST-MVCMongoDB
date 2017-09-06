'use strict';

const CommunityController = require('../controllers/community-controller'),
	express = require('express'),
	router = express.Router(),
	tc = new CommunityController();

router
	.get('/communities', tc.getAll)
	.get('/add', tc.addForm)
	.post('/communities', tc.save)
	.get('/edit/:_id', tc.getOne)
	.put('/update/:_id', tc.save)
	.delete('/remove/:_id', tc.delete);
	
module.exports = router;