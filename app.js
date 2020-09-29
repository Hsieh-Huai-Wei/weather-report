'use strict';

// require packages used in the project
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const schedule = require('node-schedule');
const bodyParser = require('body-parser');
const { PORT_TEST, PORT, NODE_ENV, API_VERSION } = process.env;
const port = NODE_ENV == 'test' ? PORT_TEST : PORT;
// app setting
app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// crawel timer
const crawel = require('./script/crawler');
schedule.scheduleJob('0 0 * * * *', crawel.runCrawler);

// connect mongoDB
require('./server/models/config/dbcon.js');

// view routes
app.use('/', [require('./server/routers/view_router')]);

// API routes
app.use('/api/' + API_VERSION, [require('./server/routers/api_router')]);

// Error handling
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

// start and listen on the Express server
if (NODE_ENV != 'production'){
    app.listen(port, () => {console.log(`Listening on port: ${port}`);});
}