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
function showRoute(req, res) {
  //// TODO: to fix at the end User.findById(req.currentUser._id).populate('cocktails').exec((err, user) => {
  // get all the cocktails that a user created...
  User.populate(req.currentUser, { path: 'eventsAttending' }, (err, user) => {
    console.log(user.eventsAttending);
    res.render('registrations/profile', { user });
  });
}

module.exports = {
  new: newRoute,
  create: createRoute,
  show: showRoute
};
