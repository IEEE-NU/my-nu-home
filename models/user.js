const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
	_id: Number,
	email: String,
	listings: [ mongoose.Schema.Types.ObjectId ],
}, { _id: false });

let User = mongoose.model('User', userSchema);
module.exports = User;