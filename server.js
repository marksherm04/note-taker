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
// GET route for request to fetch notes stored by user, app is going to only readfile here and PARSE notes
app.get("/api/notes", (req, res) => {
	fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
		let userNote = JSON.parse(data);
		if (userNote) {
			res.json(userNote);
		} else {
			res.send(404);
		};
	});
});

// POST route to submit note written by user
app.post("/api/notes", (req, res) => {
	let userNote = req.body;
	userNote.id = uuidv4();
	// db.json is going to read then write note file, the noteContent is going to be parsed (data if no error),  
	// and then convert it to a string, if errors then message will be thrown to user
	fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
		const noteContent = JSON.parse(data);
		const writeNewNote = [...noteContent, userNote];
		JSON.stringify(writeNewNote);
		res.json(writeNewNote);
		fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(writeNewNote), (err, data) => {
		});
	});
});

// DELETE route that will delete note already saved
app.delete("/api/notes/:id", (req, res) => {
	// findNoteId is finding the id that is clicked to delete by searching the id parameters
	let findNoteId = req.params.id;
	// joins the directory db.json saved notes into one path
	fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
		// for loop that gives notes an id and adds 1 to each one by i++,
		// if the parsed addedNote ID equals the findNoteId, then it'll splice the [i] addedNote
		let addedNote = JSON.parse(data);
		for (let i = 0; i < addedNote.length; i++) {
			if (addedNote[i].id === findNoteId) {
				addedNote.splice(i, 1);
				// when the file is written, it'll join the notes into 1 path and then convert it into a string with stringify,
				// it will send a response to the user with the addedNote as text, else ask user to select a note to delete
				fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(addedNote), (err, data) => {
					if (addedNote) {
						res.json(addedNote);
					} else {
						res.send(400).send("Please select a note to delete!");
					};
				});
			};
		};
	});
});

// tells the user which port they are on when running NPM start
app.listen(PORT, () => {
	console.log(`API server now on port ${PORT}!`);
});

