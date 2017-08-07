//Required Modules
const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const chalk = require('chalk');

//Required Internal Modules
const models = require('./models');
const routes = require('./routes');


//Creates app
const app = express();

//Bodyparser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.use('/', routes);

//Template Engine
var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

//sync sequelize database and set up Server
models.db.sync( { force: true }) //force:true
.then(function () {
  app.listen(3000, function () {
    console.log(chalk.blue('Server is listening on port 3000!'));
  });
})
.catch(console.error);
//Route


//Server

