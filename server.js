const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

// using middleware package
app.use(express.static("./public"));

// go to homepage index.html
app.get("/", (req, res) => {
	res.sendFile(path.join(_dirname, "./public/index.html"))
});











app.listen(PORT, () => {
	console.log(`API server now on port ${PORT}!`);
});

