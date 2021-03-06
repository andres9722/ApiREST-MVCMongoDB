'use strict';
const conn = require('./user-schema');

class UserModel {
	getUser(user, cb) {
		conn
			.findOne({
				email : user.email,
				password : user.password
			})
			.exec((err, docs) => {
				if (err) throw err;
				cb(docs);
			});
	}

	setUser(user, cb) {
		conn.create(user, (err) => {
			if(err) throw err;
			cb();
		});
	}
}

module.exports = UserModel;