var express = require('express');
var router = express.Router();

var db = require('../db/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.pool.connect(function(err, client) {
    if (err){
      console.log(err);
    } else {
      client.query('SELECT name, hands, level FROM rank ORDER BY hands', function(err, result) {
        console.log(result.rows);
        var liE = result.rows.filter(function(item, index) {
          if (item.level == 2) {
            return item;
          }
        });
        var liN = result.rows.filter(function(item, index) {
          if (item.level == 1) {
            return item;
          }
        });
        var liH = result.rows.filter(function(item, index) {
          if (item.level == 0) {
            return item;
          }
        });
        console.log(liE);
        res.render('index', {
          title: 'ランキング | Word Hit & Blow',
          urlHome: "/",
          urlRank: "/rank",
          urlRule: "/rule",
          urlContact: "/contact",
          ejsfile: './partials/rank.ejs',
          listE: liE,
          listN: liN,
          listH: liH,
        });
      });
    }
  });
});

module.exports = router;
