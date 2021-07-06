// packages and dependencies
const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");

// uses local 3001 port or lower when deploying to Heroku
const PORT = process.env.PORT || 3001;

require("./routes/apiRoutes");
require("./routes/htmlRoutes");

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

// using middleware package
app.use(express.static("./public"));

app.listen(PORT, () => {
	console.log(`API server now on port ${PORT}!`);
});

