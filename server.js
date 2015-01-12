var express = require("express");
var app = express();
var http = require("http");
var loginAPI = require("./app/controllers/LoginController")(express.Router());

app.set("port", 3000);
app.set("host", "http://localhost");

app.use("/api/v1/user", loginAPI);

app.listen(3000, function(){
	console.log("Starting Server");
})