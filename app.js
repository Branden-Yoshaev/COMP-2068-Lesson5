var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// Imprt mongoose into project
const mongoose = require('mongoose');

//Router objects
var indexRouter = require('./routes/index');
var projectsRouter = require('./routes/projects');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Register routers > map a url path to a router object
app.use('/', indexRouter);
app.use('/projects', projectsRouter);

//After custome routes, use the connect method to open a connection to your monodb cluster
 let connectionString = 'mongodb+srv://bsyoshae:Viperrocks08@cluster0.i7v3b.mongodb.net/test';
 mongoose.connect(connectionString)
 .then((message) => {
     console.log('Connected successfully!');
 })
 .catch((error) => {
     // Use title for string interpolation
     console.log(`Error while connection! ${error}`);
 });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
