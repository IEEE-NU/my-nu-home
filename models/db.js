const mongoose = require('mongoose');
const config = require('../config.js');

let dbUrl = process.env.NODE_ENV == 'prod' ? process.env.MONGODB_URI :
	`mongodb://${config.db.username}:${config.db.password}@${config.db.hostname}:${config.db.port}/${config.db.name}`;

// Attempt to connect to database
mongoose.connect(dbUrl, { useMongoClient: true });
mongoose.Promise = global.Promise;
module.exports = mongoose;