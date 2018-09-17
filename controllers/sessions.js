const User = require('../models/user');

function newRoute(req, res) {
  res.render('sessions/new');
}

function createRoute(req, res) {
  // find the user by phoneNumber address
  User.findOne({ phoneNumber: req.body.phoneNumber }, (err, user) => {
    // verify that the password supplied once hashed matches the
    // hashed password in the database
    if(!user || !user.validatePassword(req.body.password)) {
      // inform the user why they are being redirected
      req.flash('danger', 'Invalid credentials');
      return res.redirect('/login');
    }

    req.session.userId = user._id;

    req.flash('info', `Welcome back ${user.fullName}!`);

    if (req.session.returnTo)
      res.redirect(req.session.returnTo);
    else
      res.redirect('/');
  });
}

function deleteRoute(req, res) {
  req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute
};
