'use strict';

const UserModel = require('../models/user-model'),
	errors = require('../middlewares/errors'),
	um = new UserModel();

class UserController {
	index(req, res, next) {
		if ( req.session.email ) {
			res.redirect('/communities');
		} else {
			res.render('login-form', {
				title: 'Valoop',
				message: req.query.message
			});
		}
	}

	logInGet(req, res, next) {
		res.redirect('/');
	}

	logInPost(req, res, next) {
		let user = {
			email: req.body.email,
			password: req.body.password
		};

		console.log(user);

		um.getUser(user, (docs) => {
			req.session.email = ( docs != null ) ? user.email : null;

			console.log(req.session, '---', docs);

			return (req.session.email)
				? res.redirect('/communities')
				: errors.http401(req, res, next);
		});
	}

	signInGet(req, res, next) {
		res.redirect('/');
	}

	signInPost(req, res, next) {
		let user = {
			user_id: 0,
			email: req.body.email,
			nick: req.body.nick,
			name: req.body.name,
			last_name: req.body.last_name,
			password: req.body.password
		};

		console.log(user);

		um.setUser(user, (docs) => {
			res.redirect(`/?message=El usuario ${user.email} ha sido creado`);
		});
	}
	
	logOut(req, res, next) {
		req.session.destroy((err) => {
			return (err)
					? errors.http500(req, res, next)
					: res.redirect('/');
		});
	}
}

module.exports = UserController;