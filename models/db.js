const mongoose = require('mongoose');
const config = require('../config.js');

let dbUrl = 'mongodb://' + config.db.username + ':' + config.db.password;
dbUrl += '@' + config.db.hostname + ':' + config.db.port + '/' + config.db.name;

// Attempt to connect to database
mongoose.connect(dbUrl, { useMongoClient: true });
mongoose.Promise = global.Promise;
module.exports = mongoose;