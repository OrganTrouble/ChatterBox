var express = require("express"),
	app = express(),
	http = require("http").Server(app),
	io = require("socket.io")(http);

app.use(express.static("static"));

io.on("connection", function(socket) {
	console.log("a user connnected");
	socket.on("disconnect", function() {
		console.log("user disconnected");
	});
	
	socket.on("chat message", function(msg) {
		console.log("message " + msg);
		io.emit("chat message", {m: msg.m, u: msg.u});
	});
});


var port;

if(process.argv[2]) {port = process.argv[2]} else {port = 3000}

http.listen(port, function() {
	console.log("chat listening on port " + port + ".");
});
