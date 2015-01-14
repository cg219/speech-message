var request = require("supertest");
var mongoose = require("mongoose");
var config = require("./../config/config");
var should = require("chai").should();
var expect = require("chai").expect();
var userModel = require("./../app/models/UserModel");

describe("User", function(){
	var url = "http://localhost:3000/api/v1/user"

	var user = {
		username: "test",
		password: "test",
		phonenumber: "7185555555"
	}

	describe("Register", function(){
		it("should return a user", function(done){

			request(url)
				.post("/register")
				.send(user)
				.expect(200)
				.end(function(err, response){
					if(err){
						throw err;
					}

					done();
				})
		})
	})

	describe("Login", function(){
		it("should return a logged in user", function(done){

			request(url)
				.post("/login")
				.send(user)
				.expect(200)
				.end(function(err, response){
					if(err){
						throw err;
					}
					
					done();
				})
		})
	})

	after(function(done){
		mongoose.connect(config.mongo);
		userModel.find(user).limit(1).remove(function(err){
			console.log("DB Cleaned");
			done();
		})
	})
})
