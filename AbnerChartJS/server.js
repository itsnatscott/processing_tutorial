var express = require("express");
var app = express();

app.get("/", function(req, res) {
	res.redirect("/soccer")
});

app.get("/soccer", function(req, res) {
	res.sendFile(__dirname + "/bpl_2015.html")
});

app.listen(3000)