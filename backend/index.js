// load framework
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// server instance
const app = express();

// file sistem
const fs = require('fs');

// path tool
const path = require('path')

// server configuration

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({origin:"http://localhost:3000"}))


const routes = require('./routes/routes.js')(app, fs, path);

// server laucher
const server = app.listen(3001, () => {
  console.log('listening on port ' + server.address().port)
})