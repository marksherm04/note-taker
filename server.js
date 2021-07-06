// packages and dependencies
const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");

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




app.listen(PORT, () => {
	console.log(`API server now on port ${PORT}!`);
});

