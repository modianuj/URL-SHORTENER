const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
  full_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
    required: true,
  },
});

const url = mongoose.model('url', urlSchema);

module.exports = url;
