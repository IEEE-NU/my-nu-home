const mongoose = require('mongoose');
const userListingsSchema = mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	address: String,
}, { _id: false });

const userSchema = mongoose.Schema({
	_id: Number,
	email: String,
	listings: [ userListingsSchema ],
}, { _id: false });

let User = mongoose.model('User', userSchema);
module.exports = User;
