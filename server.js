const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const database = require('./database.js');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');


async function createServer () {
    await database.connect();

    // See https://github.com/exegesis-js/exegesis/blob/master/docs/Options.md

    // This creates an exegesis middleware, which can be used with express,
    // connect, or even just by itself.

    const app = express();

    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
    app.use(cookieParser());

    app.use(cors("localhost:3000"));

    app.use('/static', express.static('public'));

    app.use('/', indexRouter);
    app.use('/auth', authRouter);

    // Return a 404
    app.use((req, res) => {
        console.log('404 not found');
        res.status(404).json({ message: `Not found` });
    });

    // Handle any unexpected errors
    app.use((err, req, res, next) => {
        res.status(500).json({ message: `Internal error: ${err.message}` });
        console.log('500 Internal error: ' + err.message);
    });

    const server = http.createServer(app);

    return server;
}

createServer()
  .then(server => {
    server.listen(3001);
    console.log(`Listening on port 3001`);
  })
  .catch(err => {
    console.log(err.stack);
    process.exit(1);
  });