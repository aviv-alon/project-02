const User = require('../models/user');

function newRoute(req, res) {
  res.render('registrations/new');
}

function createRoute(req, res) {
  User.create(req.body, (err) => {
    if(err) return res.redirect('/register');
    res.redirect('/login');
  });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
