const prefix = 'MY_NU_HOME_';
let config = {};

config.web = {
	port: process.env[prefix + 'PORT'] || 8080,
};

// DATABASE
let category = 'DB_';
config.db = {
	name: process.env[prefix + category + 'NAME'],
	username: process.env[prefix + category + 'USERNAME'],
	password: process.env[prefix + category + 'PASSWORD'],
	hostname: process.env[prefix + category + 'HOSTNAME'],
	port: process.env[prefix + category + 'PORT'],
};

// OAUTH
category = 'GOOGLE_';
config.google = {
	id: process.env[prefix + category + 'ID'],
	secret: process.env[prefix + category + 'SECRET'],
}

module.exports = config;