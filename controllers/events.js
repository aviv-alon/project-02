const Event = require('../models/event');

function indexRoute(req, res) {
  Event
    .find()
    .populate('user')
    .sort({ name: 1 })
    .exec((err, events) => {
      res.render('events/index', { events });
    });
}

function showRoute(req, res) {
  Event
    .findById(req.params.id)
    .populate('user')
    .populate('photos')
    .exec((err, event) => {
      res.render('events/show', { event });
    });
}

function newRoute(req, res) {
  res.render('events/new');
}

function createRoute(req, res) {
  req.body.createdBy = req.currentUser;
  req.body.user = req.currentUser;
  req.body.isAdmin = true;
  Event.create(req.body, (err,event) => {
    console.log(this._id);
    event.members.push(req.body);
    event.save(() => {
      res.redirect(`/events/${event._id}`);
    });
    //res.redirect('/events');
  });
}

function editRoute(req, res) {
  Event.findById(req.params.id, (err, event) => {
    res.render('events/edit', { event });
  });
}

function updateRoute(req, res) {
  // we cannot make PUT requests without method-override
  // without method-override this route will never work!!!!!!! 💥
  console.log(req.body.ingredients);
  Event.findById(req.params.id, (err, event) => {
    event.set(req.body);
    event.save(() => {
      res.redirect(`/events/${req.params.id}`);
    });
  });
}

function deleteRoute(req, res) {
  // we cannot make DELETE requests without method-override
  // without method-override this route will never work!!!!!!! 💥
  Event.findById(req.params.id, (err, event) => {
    event.remove(() => {
      res.redirect('/events');
    });
  });
}

function createCommentRoute(req, res) {
  // IMPORTANT - this adds the currentUser to the form data so that it can be
  // referenced on the model -- possible because of `lib/auth.js`
  req.body.user = req.currentUser;
  Event.findById(req.params.id, (err, event) => {
    event.comments.push(req.body);
    event.save(() => {
      res.redirect(`/events/${req.params.id}`);
    });
  });
}

function deleteCommentRoute(req, res) {
  Event.findById(req.params.id, (err, event) => {
    const comment = event.comments.id(req.params.commentId);
    comment.remove();
    event.save(() => {
      res.redirect(`/events/${req.params.id}`);
    });
  });
}

const createMemberRoute = (req, res) => {
  req.body.user = req.currentUser;
  Event.findById(req.params.id, (err, event) => {
    event.members.push(req.body);
    event.save(() => {
      res.redirect(`/events/${req.params.id}`);
    });
  });
};




module.exports = {
  index: indexRoute,
  show: showRoute,
  new: newRoute,
  create: createRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute,
  createMember: createMemberRoute
};
