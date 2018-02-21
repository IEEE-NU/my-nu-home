// Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');
const config = require('../config.js');

// Your Google Cloud Platform project ID
const projectId = config.google.project;

// Creates a client
const storage = new Storage({
  projectId: projectId,
});

// The name for the new bucket
const bucketName = 'my-new-bucket-cschen13';

// Creates the new bucket
storage
  .createBucket(bucketName)
  .then(() => {
    console.log(`Bucket ${bucketName} created.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });