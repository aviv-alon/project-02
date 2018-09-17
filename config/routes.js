const router = require('express').Router(),
  eventsController = require('../controllers/events'),
  registrationsController = require('../controllers/registrations'),
  sessionsController = require('../controllers/sessions'),
  photosController = require('../controllers/photos'),
  // IMPORTANT -- this allows us to stop unauthenticated users
  // accessing specific routes
  secureRoute = require('../lib/secureRoute');

router.get('/', (req, res) => res.render('home'));

router.route('/events')
  .get(eventsController.index)
  .post(secureRoute, eventsController.create);

router.get('/events/new', secureRoute, eventsController.new);

router.route('/events/:id')
  .get(eventsController.show)
  .put(secureRoute, eventsController.update)
  .delete(secureRoute, eventsController.delete);

router.get('/events/:id/edit', secureRoute, eventsController.edit);

router.post('/events/:id/comments', secureRoute, eventsController.createComment);
router.delete('/events/:id/comments/:commentId', secureRoute, eventsController.deleteComment);


router.post('/events/:id/photos', secureRoute, photosController.create);
//router.delete('/events/:id/photos/:photoId', secureRoute, photosController.delete);

router.post('/events/:id/photos/:photoId/like', secureRoute, photosController.addLike);
//router.delete('/events/:id/photos/:photoId', secureRoute, photosController.delete);

router.route('/register')
  .get(registrationsController.new)
  .post(registrationsController.create);

router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

router.get('/logout', sessionsController.delete);

router.route('/*').all((req, res) => res.status(404).render('404'));

module.exports = router;
