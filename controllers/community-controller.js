'use strict';

const CommunityModel = require('../models/community-model'),
	errors = require("../middlewares/errors"),
	cm = new CommunityModel();

class CommunityController {
	getAll(req, res, next) {
		return (req.session.email)
			? cm.getAll((docs) => {
				res.render('index', {
					title: 'Communities',
					user: req.session.email,
					data: docs
				});
			})
			: errors.http401(req, res, next)
	}

	getOne(req, res, next) {
		let _id = req.params._id;
		console.log(_id);

		return (req.session.email)
			? cm.getOne(_id, (docs) => {
				console.log(docs);
				
				res.render('edit', {
					title : 'Edit contact',
					user : req.session.email,
					data : docs
				});
			})
			: errors.http401(req, res, next);
	}

	save(req, res, next) {
		let community = {
			_id: (req.body._id || null),
			name: req.body.name,
			description: req.body.description,
			logo: req.body.logo,
			inv_token: 0
		};
		
		console.log(community);

		return (req.session.email)
			? cm.save( community, () => res.redirect('/communities') )
			: errors.http401(req, res, next);
	}

	delete(req, res, next) {
		let _id = req.params._id;
		console.log(_id);

		return (req.session.email)
			? cm.delete( _id, () => res.redirect('/communities') )
			: errors.http401(req, res, next);
	}

	addForm(req, res, next) {
		return (req.session.email)
			? res.render('add', {
				title: 'Add contact',
				user : req.session.email
			})
			: errors.http401(req, res, next);
	}
}

module.exports = CommunityController;