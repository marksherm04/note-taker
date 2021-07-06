const express = require("express");
const fs = require("fs");
const path = require("path");
const router = require("express").Router();


// API routes -- GET routes
app.get("/api/notes", (req, res) => {
	fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
		if (err) {
			throw (err)
		}
		else {
			const userNote = JSON.parse(data);
			res.send(userNote);
		}
	});
});

app.post("/api/notes", (req,res) => {
	const userNote = req.body;
	notes.push(userNote);
	fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
		const noteContent = JSON.parse(data);
		const newNote = [...noteContent, userNote];
		JSON.stringify(newNote);
		res.send(newNote);
		fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(newNote), (err, data) => {
			if (err) {
				throw (err);
			}
		});
	});
});

module.exports = router;