'use strict';

const mongoose = require('./model'),
	Schema = mongoose.Schema,
	UserSchema = new Schema({
		email : String,
		nick : String,
		name : String,
		last_name : String,
		password : String,
	},
	{
		collection : 'user'
	}),
	User = mongoose.model('User', UserSchema);

module.exports = User;