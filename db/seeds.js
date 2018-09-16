const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

//const Event = require('../models/event');
const User = require('../models/user');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase(); // delete the database ready for new data

  User.create({
    fullName: 'Aviv Alon',
    phoneNumber: '123',
    email: 'alon@aviv.email',
    password: '123',
    passwordConfirmation: '123'
  }, (err) => {
    if(err) console.log(err);

  });
});
