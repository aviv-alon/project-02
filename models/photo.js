const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

// describe the schema
const photoSchema = new mongoose.Schema({
  url: { type: String, required: true, pattern: /^https?:\/\/.+/ },
  name: { type: String },
  location: { type: String },
  time: { type: Date, default: Date.now},
  comments: [ commentSchema ],
  likes: [ { type: mongoose.Schema.ObjectId, ref: 'User'} ],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }

});

// create the model
module.exports = mongoose.model('Photo', photoSchema);
