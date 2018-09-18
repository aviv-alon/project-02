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
// TODO:
function deleteRoute(req, res) {
  Event.findById(req.params.id, (err, event) => {
    const comment = event.comments.id(req.params.commentId);
    comment.remove();
    event.save(() => {
      res.redirect(`/events/${req.params.id}`);
    });
  });
}

function addLikeRoute (req, res) {
  req.body.user = req.currentUser;

  Photo.findById(req.params.photoId, (err, photo) => {
    photo.likes.push(req.body.user);
    photo.save(() => {
      res.redirect(`/events/${req.params.id}/#${req.params.photoId}`);
    });
  });
}



module.exports = {
  create: createRoute,
  delete: deleteRoute,
  addLike: addLikeRoute
};
