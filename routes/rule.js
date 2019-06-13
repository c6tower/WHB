var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'ルールブック | Word Hit & Blow',
    urlHome: "/",
    urlRank: "/rank",
    urlRule: "/rule",
    urlContact: "/contact",
    ejsfile: './partials/rule.ejs',
  });
});

module.exports = router;
