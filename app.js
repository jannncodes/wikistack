//Required Modules
const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const models = require('./models');


//Creates app
const app = express();

//Middleware
app.use(morgan);
app.use(express.static('public'));

//Bodyparser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Template Engine
var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

//sync sequelize
models.User.sync({})
.then(() => {
  return models.Page.sync({});
})

//Route


//Server

