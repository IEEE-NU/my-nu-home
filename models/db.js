const mongoose = require('mongoose');
const dbUrl = process.env.MY_NU_HOME_DB || '';

// Attempt to connect to database
mongoose.connect(dbUrl, { useMongoClient: true });
mongoose.Promise = global.Promise;
module.exports = mongoose;