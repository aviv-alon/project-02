const User = require('../models/user');

function newRoute(req, res) {
  req.session.returnTo = req.headers.referer;
  res.render('registrations/new');
}

function createRoute(req, res) {
  console.log(req.session);
  User.create(req.body, (err) => {
    if(err) return res.redirect('/register');
    res.redirect('/login');
  });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
