'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const messages = require('./routes/classifieds');

app.use(express.static('public'));
app.use('/angular', express.static('node_modules/angular'));
app.use('/angular-moment', express.static('node_modules/angular-moment'));
app.use('/moment', express.static('node_modules/moment'));

app.use('/classifieds',messages);

app.use((err, _req, res, _next) => {
  console.log(err);
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  } else {
    return res.sendStatus(500);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
