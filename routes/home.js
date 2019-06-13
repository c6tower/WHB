var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: '英単語推測ゲーム | Word Hit & Blow',
    urlHome: "/",
    urlRank: "/rank",
    urlRule: "/rule",
    urlContact: "/contact",
    ejsfile: './partials/home.ejs',
  });
});

module.exports = router;
