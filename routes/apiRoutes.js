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