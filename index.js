// 3rd-party packages
const express = require('express'),
  ejsLayouts = require('express-ejs-layouts'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  session = require('express-session'),
  flash = require('express-flash'), // allows flash messaging
  auth = require('./lib/auth'),
  routes = require('./config/routes'),
  mongoose = require('mongoose');

// create the app
const app = express();
const { port, dbURI } = require('./config/environment');

// connect to the database
mongoose.connect(dbURI);

// app settings
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

// use 3rd-party packages
app.use(ejsLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(req => {
  if(req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(session({
  secret: 'shhh',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(auth);

// routes
app.use(routes);

// listen for incoming traffic -- app.listen()
app.listen(port, () => console.log(`Express is running on port ${port}`));




//app.get('/', (req, res) => res.send('<h1>Hello world!</h1>'));
