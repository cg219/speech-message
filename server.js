var express = require("express");
var app = express();
var http = require("http");
var loginAPI = require("./app/controllers/LoginController")(express.Router());
var bodyParser = require("body-parser");
var server = http.createServer(app);
var io = require("socket.io")(server);

app.set("port", 3000);
app.set("host", "http://localhost");

app.use(bodyParser.json());
app.use("/api/v1/user", loginAPI);

io.on("connection", function(socket){
	console.log("new Socket Connected");
})

server.listen(3000, function(){
	console.log("Starting Server");
})