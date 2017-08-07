const express = require("express");
const router = express.Router();

const wikiRouter = require('./wiki');
const userRouter = require('./user');
const models = require('../models/');
const Page = models.Page;
const User = models.User;

//Set up middlewares for wikiRouter and userRouter
router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

router.get('/', function (req, res, next) {
  Page.findAll()
  .then((arrOfPages) => {
    res.render('index', {pages: arrOfPages});
  })
  .catch(next);
});

module.exports = router;
