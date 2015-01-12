var userModel = require("./../models/UserModel");
var config = require("./../../config/config");
var mongoose = require("mongoose");

function LoginController(router){
	this.router = router;


}

LoginController.prototype.login = function(username, password, number, res, req) {
	var query = userModel.find({
		username: username,
		phonenumber: number
	})
	.limit(1);

	var promise = query.exec();

	promise.addCallback(function(results){
		mongoose.disconnect();
		res.json(results);
	});
};

LoginController.prototype.register = function(username, password, number, res, req) {
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
		if(results){
			mongoose.disconnect();
			res.json({
				message: "User Exists",
				error: true,
				code: 1
			});
		}
		else{
			newUser.save(function(err, user, amount){
				mongoose.disconnect();
				res.json(user);
			})
		}
	});
};

module.exports = function(router){
	var login = new LoginController(router);

	login.router.post("/login", function(res, req){
		login.login(req.param("username"),req.param("password"),req.param("number"), res, req);
	})

	login.router.post("/register", function(res, req){
		login.register(req.param("username"),req.param("password"),req.param("number"), res, req);
	})
}