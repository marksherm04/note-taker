const express = require("express");
const fs = require("fs");
const path = require("path");
const router = require("express").Router();

// / callback function executing everytime homepage index.html route is accessed with GET request
app.get("*", (req, res) => {
	res.sendFile(path.join(_dirname, "./public/index.html")) // may need to add ./public in front -- going to test
});

// callback function executing everytime notes route is accessed with GET request
app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/notes.html")) // may need to add ./public in front -- going to test
});

module.exports = router;