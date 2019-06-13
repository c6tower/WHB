var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'ランキング | Word Hit & Blow',
    urlHome: "/",
    urlRank: "/rank",
    urlRule: "/rule",
    urlContact: "/contact",
    ejsfile: './partials/rank.ejs',
  });
});

module.exports = router;
