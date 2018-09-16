const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

// describe the schema
const eventSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true, minlength: 3 },
  imageCover: { type: String, required: true, pattern: /^https?:\/\/.+/ },
  location: { type: String },
  startTime: { type: String },
  endTime: { type: String },
  about: String,
  comments: [ commentSchema ],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  photos: [{ type: mongoose.Schema.ObjectId, ref: 'Photo' }]
});

// create the model
module.exports = mongoose.model('Event', eventSchema);
