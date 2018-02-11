const User = require('../models/user.js');
const login = require('../routes/login.js');
let router = require('express').Router();

// TODO; Add user page of listings
router.get('/user/:id', (req. res) => {
	res.status(500).send('unimplemented');
});

module.exports = router;