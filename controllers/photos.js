const Photo = require('../models/photo');
const Event = require('../models/event');

function createRoute(req, res) {
  //console.log(req.params);
  // IMPORTANT - this adds the currentUser to the form data so that it can be
  // referenced on the model -- possible because of `lib/auth.js`
  req.body.user = req.currentUser;
  Photo.create(req.body, (err, photo) => {
    console.log(photo);
    Event.findById(req.params.id, (err, event) => {
      event.photos.push(photo._id);
      event.save(() => {
        res.redirect(`/events/${req.params.id}`);
      });
    });
  });
}

function deleteRoute(req, res) {
  Event.findById(req.params.id, (err, event) => {
    const comment = event.comments.id(req.params.commentId);
    comment.remove();
    event.save(() => {
      res.redirect(`/events/${req.params.id}`);
    });
  });
}

module.exports = {
  create: createRoute,
  delete: deleteRoute
};
