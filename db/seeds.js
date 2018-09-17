const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

const Event = require('../models/event');
const User = require('../models/user');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase(); // delete the database ready for new data

  User.create({
    fullName: 'Aviv Alon',
    phoneNumber: '123',
    email: 'alon@aviv.email',
    password: '123',
    passwordConfirmation: '123',
    picture: 'http://www.gstatic.com/tv/thumb/persons/939368/939368_v9_ba.jpg'
  }, (err,user) => {
    if(err) console.log(err);
    Event.create({
      name: 'Harry and Meghan',
      imageCover: 'https://cdn.images.express.co.uk/img/dynamic/106/590x/rules-meghan-markle-prince-harry-wedding-guests-956388.jpg',
      location: 'St George\'s Chapel, Windsor Castle, Windsor',
      startTime: '19 May 2018, 12:00 pm BST',
      about: 'The wedding of Prince Harry and Meghan Markle was held on 19 May 2018 in St George\'s Chapel at Windsor Castle in the United Kingdom. The groom, Prince Harry, is a member of the British royal family; the bride, Meghan Markle, is an American and former actress.',
      createdBy: user,
      members: [
        {
          user: user,
          isAdmin: true
        }
      ]
    }, (err, records) => {
      if(err) console.log(err);
      console.log(`${records.length} event created!`);
      mongoose.connection.close();
    });
  });
});
