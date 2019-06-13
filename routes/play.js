var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/easy', function(req, res, next) {
  res.render('index', {
    title: 'easy | Word Hit & Blow',
    urlHome: "/",
    urlRank: "/rank",
    urlRule: "/rule",
    urlContact: "/contact",
    ejsfile: './partials/play.ejs',
  });
});

router.get('/normal', function(req, res, next) {
  res.render('index', {
    title: 'normal | Word Hit & Blow',
    urlHome: "/",
    urlRank: "/rank",
    urlRule: "/rule",
    urlContact: "/contact",
    ejsfile: './partials/play.ejs',
  });
});

router.get('/hard', function(req, res, next) {
  res.render('index', {
    title: 'hard | Word Hit & Blow',
    urlHome: "/",
    urlRank: "/rank",
    urlRule: "/rule",
    urlContact: "/contact",
    ejsfile: './partials/play.ejs',
  });
});

module.exports = router;
