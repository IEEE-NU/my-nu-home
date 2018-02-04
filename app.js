const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('./models/db.js');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const config = require('./config.js');

// Set the template engine to ejs and the views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Allow the server to parse HTTP request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Serve static files (CSS, JavaScript, images, etc.) from the public folder
app.use(express.static(path.join(__dirname, 'public')));

let db = mongoose.connection;

// Prepare the user session store
app.use(session({
	secret: config.session.secret,
	store: new MongoStore({ mongooseConnection: db }),
	saveUninitialized: true,
	resave: true,
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	// Only start the server if we are able to connect to the database
	app.listen(config.web.port, () => {
		app.get('/', (req, res) => {
			res.render('index', { errors: req.flash('error') });
		});
		app.use(require('./routes/login.js').router);
		app.use(require('./routes/listing.js'));
		app.use(require('./routes/list.js'));
		app.use(require('./routes/sell.js'));
		// Put all other routes above this one.
		app.get('*', (req, res) => {
			res.status(404);

			// respond with html page
			if (req.accepts('html')) {
				res.render('error', {
					status: 404,
					message: 'The page you were looking for could not be found. Go <a href="/">home</a>.'
				});
				return;
			}

			// respond with json
			if (req.accepts('json')) {
				res.send({ error: 'Not found' });
				return;
			}

			// default to plain-text. send()
			res.type('txt').send('Not found');

		});
		console.log(`Server listening on port ${config.web.port}`);
	});
});