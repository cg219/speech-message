var userModel = require("./../models/UserModel");
var config = require("./../../config/config");
var mongoose = require("mongoose");

function LoginController(router){
	this.router = router;
}

LoginController.prototype.login = function(username, password, number, req, res) {
	mongoose.connect(config.mongo);

	var query = userModel.find({
		username: username,
		phonenumber: number
	})
	.limit(1);

	var promise = query.exec();

	promise.addCallback(function(results){
		mongoose.disconnect();
		res.status(200);
		res.json(results).end();
	});
};

LoginController.prototype.register = function(username, password, number, req, res) {
	mongoose.connect(config.mongo);

	var User = userModel;

	var userLookup = User.find({
		username: username,
		phonenumber: number
	})
	.limit(1);

	var newUser = new User({
		username: username,
		password: password,
		phonenumber: number
	});

	var promise = userLookup.exec();

	promise.addCallback(function(results){
		if(results.length > 0){
			mongoose.disconnect();
			res.status(500);
			res.json({
				message: "User Exists",
				error: true,
				code: 1
			}).end();
		}
		else{
			newUser.save(function(err, user, amount){
				mongoose.disconnect();
				res.status(200);
				res.json(user).end();
			})
		}
	});
};

module.exports = function(router){
	var login = new LoginController(router);

	login.router.post("/login", function(req, res){
		login.login(req.param("username"), req.param("password"), req.param("phonenumber"), req, res);
	})

	login.router.post("/register", function(req, res){
		login.register(req.param("username"), req.param("password"), req.param("phonenumber"), req, res);
	})

	return login.router;
}