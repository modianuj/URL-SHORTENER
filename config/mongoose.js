const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017';

mongoose.connect(`${url}/URL-Shortener`);

const db = mongoose.connection;

db.on('error', console.error.bind(`error`, `database error`));

db.once('open', (error) => {
  if (error) {
    console.log(`database connection error`);
  }
  console.log(`database connected Succesfully`);
});

module.exports = db;
