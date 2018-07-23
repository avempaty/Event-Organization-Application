const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const users = require('./routes/user');
const events = require('./routes/events');
const qrgenerator = require('./routes/qrgenerator');
const loginvalidation = require('./routes/loginvalidation');
const connections = require('./routes/connections');
const profileimages = require('./routes/profileimages');

let app = express();

app.use(cors());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api/users', users);
app.use('/api/events', events);
app.use('/api/qrgenerator', qrgenerator);
app.use('/api/loginvalidation', loginvalidation);
app.use('/api/connections', connections);
app.use('/api/profileimages', profileimages);
app.get('/', (req, res) => {
  res.redirect('/defected');
});
app.get('/defected', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/defected/index.html'));
});
app.get('/reference', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/reference/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.jsonp({
      message: err.message,
      error: err 
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.jsonp({
    message: err.message,
    error: err 
  });
});

module.exports = app;
