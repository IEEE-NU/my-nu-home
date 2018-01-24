const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;
const mongoose = require('./models/db.js');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Set the template engine to ejs and the views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.MY_NU_HOME_GOOGLE_ID,
    clientSecret: process.env.MY_NU_HOME_GOOGLE_SECRET,
    callbackURL: "http://localhost:8080/sell"
  },
  function(accessToken, refreshToken, profile, done) {
  	console.log("Logged in");
  	console.log(profile);
    done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
	console.log("serializing");
	console.log(user);
	done(null, user.id);
});

passport.deserializeUser(function(user, done) {
	console.log("deserializing user");
	console.log(user);
	done(null, user);
});

// Define the root route behavior such that the server sends 
// the index template to the client
app.get('/', (req, res) => res.render('index'));

// Serve static files (CSS, JavaScript, images, etc.) from the public folder
app.use(express.static(path.join(__dirname, 'public')));

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	// Only start the server if we are able to connect to the database
	app.listen(PORT, () => {
		app.use(require('./routes/login.js'));
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
		console.log(`Server listening on port ${PORT}`);
	});
});