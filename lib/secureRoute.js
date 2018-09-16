// this is a checkpoint that allows us to protect
// specific routes in config/routes.js
function secureRoute(req, res, next) {
  // if there is no user id in the session
  if(!req.session.userId) {
    // clear out the session and redirect to login
    // ie. log the user out
    return req.session.regenerate(() => {
      req.flash('danger', 'Not authorized');
      return res.redirect('/login');
    });
  }

  // otherwise allow the request to reach its destination
  // ie. go to the next step
  next();
}

module.exports = secureRoute;
