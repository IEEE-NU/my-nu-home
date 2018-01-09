const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;

const MongoClient = require('mongodb').MongoClient

// Set the template engine to ejs and the views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Define the root route behavior such that the server sends 
// the index template to the client
app.get('/', (req, res) => res.render('index'));

// Attempt to connect to Mongo database
let db;
let dbUrl = process.env.MY_NU_HOME_DB || '';
MongoClient.connect(dbUrl, (err, database) => {
	if (err) return console.log(err);
	db = database;
	// Only start the server if we are able to connect to the database
	app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
	});
});