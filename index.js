var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http); // socket instance initialized by passing http server

// redirects requests to the index.html page
app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

// socket instance–on connection, executes this
io.on("connection", function(socket) {
	// gets a chat message emitted from somebody
	socket.on("chat message", function(msg) {
		io.emit("chat message", msg); // emits the message for everyone
	});
});

// starts the server
http.listen(3000, function() {
	console.log("listening on *:3000");
});
