var request = require("supertest");
var mongoose = require("mongoose");
var config = require("./../config/config");

describe("User", function(){
	var url = "http://localhost/api/v1/user"

	before(function(success){
		mongoose.connect(config.mongotest);
		success();
	})

	describe("Register", funciton(){
		it("should return a user", function(success){
			var user = {
				username: "test",
				password: "test",
				phonenumber: "7185555555"
			}

			request(url)
				.post("/register")
				.send(user)
				.end(function(err, response){
					if(err){
						throw err
					}

					response.should.have.status(400);
					success();
				})
		})
	})
})
