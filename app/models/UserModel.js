var mongoose = require("mongoose");
var model = mongoose.model("UserModel", mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	phonenumber: {
		type: String,
		required: true,
		unique: true
	}
}));

module.exports = model;