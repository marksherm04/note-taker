// packages and dependencies
const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");

// installed uuid package to give each note a unique ID when saved - found in npm express packages
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

// uses local 3001 port or lower when deploying to Heroku
const PORT = process.env.PORT || 3001;

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

// using middleware package
app.use(express.static("./public"));

// / callback function executing everytime homepage index.html route is accessed with GET request
app.get("/", (req, res) => {
	res.sendFile(path.join(_dirname, "./public/index.html")) // may need to add ./public in front -- going to test
});

// callback function executing everytime notes route is accessed with GET request
app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/notes.html")) // may need to add ./public in front -- going to test
});


// API routes 
// GET route for request to fetch notes stored by user, app is going to only readfile here and PARSE note
app.get("/api/notes", (req, res) => {
	fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
		if (err) {
			throw (err)
		}
		else {
			const userNote = JSON.parse(data);
			res.send(userNote);
		};
	});
});
// POST route to submit note written by user
app.post("/api/notes", (req, res) => {
	const userNote = req.body;
	userNote.id = uuidv4();
	// db.json is going to read then write note file, the noteContent is going to be parsed (data is no error),  
	// and then convert it to a string, if errors then message will be thrown to user
	fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
		const noteContent = JSON.parse(data);
		const writeNewNote = [...noteContent, userNote];
		JSON.stringify(writeNewNote);
		res.send(writeNewNote);
		fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(writeNewNote), (err, data) => {
			if (err) {
				throw (err);
			}
		});
	});
});

app.delete("/api/notes/:id", (req, res) => {
	const currentNotes = path.join(__dirname, "/db/db.json");
	const newNotes = JSON.parse(data);
	// for loop to delete note via note ID
	for (let i = 0; i < newNotes.length; i++) {

		if (newNotes[i].id === req.params.id) {
			newNotes.splice(i, 1);
			break;
		}
	}
	fs.writeFile(currentNotes, JSON.stringify(newNotes), (err, data) => {
	if (err) {
		throw (err);
	} else {
		console.log("You deleted a note");
	}
	});
	res.json(newNotes);
});

// tells the user which port they are on when running NPM start
app.listen(PORT, () => {
	console.log(`API server now on port ${PORT}!`);
});

