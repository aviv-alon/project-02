const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

const likesSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

// describe the schema
const photoSchema = new mongoose.Schema({
  url: { type: String, required: true, pattern: /^https?:\/\/.+/ },
  location: { type: String },
  time: { type: String },
  comments: [ commentSchema ],
  likes: [ likesSchema ],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

// create the model
module.exports = mongoose.model('Photo', photoSchema);
