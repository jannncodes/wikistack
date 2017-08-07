const express = require('express');
const chalk = require('chalk');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.get('/', function(req,res,next){
  res.redirect('/');
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.post('/', function(req, res, next) {
  User.findOrCreate({
    where: {
      name: req.body.author_name,
      email: req.body.author_email
    }
  })
  .then(function (values) {
    var user = values[0];
    var page = Page.build({
      title: req.body.title,
      content: req.body.page_content
    });

  // return page.save()
  //   .then(function (page) {
  //   return page.setAuthor(user);
  // });
    return Promise.all([page.save()]);
  })
  .then(function(arrayofResolvedValues){
    console.log('we are here')
    let page = arrayofResolvedValues[0];
    let user = arrayofResolvedValues[1];
    return page.setAuthor(user);
  })
  .then(function (page) {
    res.redirect(page.route);
  })
  .catch(next);
});

//create new get with newly created url title/getter method...render page
router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  }).then((foundPage) => {
    res.render('wikipage', {page: foundPage});
  }).catch(next);
});



module.exports = router;
