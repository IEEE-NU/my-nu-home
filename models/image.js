// Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');
const config = require('../config.js');

// Your Google Cloud Platform project ID
const projectId = config.google.project;
const bucketName = config.google.bucket;

// Creates a client
const storage = new Storage({
  projectId: projectId,
});

module.exports = storage.bucket(bucketName);