var express = require('express');
var router = express.Router();

var wordList = require('../wordList.json');
var db = require('../db/index');

var selectLv = (lv, rreq) => {
  var ans;
  while(true){
    var aaa = wordList[Math.floor(Math.random() * wordList.length)];
    if (aaa.level == lv){
      ans = aaa.word;
      console.log(ans);
      break;
    }
  }
  var ansAry = ans.split('');
  console.log(ansAry);
  rreq.session.answ = ansAry;
}

var renderData = {
  title: 'easy | Word Hit & Blow',
  urlHome: "/",
  urlRank: "/rank",
  urlRule: "/rule",
  urlContact: "/contact",
  ejsfile: './partials/play.ejs',
  msg: "半角英字で入力してください",
  content: [],
  content1: [],
  content2: [],
  lvl: 2,
}

router.get('/easy', function(req, res, next) {
  selectLv("2", req);
  renderData.lvl = 2;
  renderData.title = "easy | Word Hit & Blow";
  req.session.renderData = renderData;
  res.render('index', req.session.renderData);
});

router.get('/normal', function(req, res, next) {
  selectLv("1", req);
  renderData.lvl = 1;
  renderData.title = "normal | Word Hit & Blow";
  req.session.renderData = renderData;
  res.render('index', req.session.renderData);
});

router.get('/hard', function(req, res, next) {
  selectLv("0", req);
  renderData.lvl = 0;
  renderData.title = "hard | Word Hit & Blow";
  req.session.renderData = renderData;
  res.render('index', req.session.renderData);
});

// POST
router.post('/game', (req, res, next) => {
  var pre = req.body["predict"];
  req.session.wordAry = pre;
  console.log(pre);
  preAry = pre.split('');
  // 同じ文字確認
  for (var i = 0; i < preAry.length; i++) {
    for (var j = i + 1; j < preAry.length; j++) {
      if (preAry[i] == preAry[j]){
        req.session.renderData.msg = "同じ文字は使えません"
        res.render('index', req.session.renderData);
        return false;
      }
    }
  }
  // hit, blow
  var ansAry = req.session.answ;
  var hit = 0;
  var blow = 0;
  for (var i = 0; i < preAry.length; i++) {
    if (preAry[i] == ansAry[i]) {
      hit += 1;
    }
  }
  for (var i = 0; i < preAry.length; i++) {
    for (var j = 0; j < preAry.length; j++) {
      if (preAry[i] == ansAry[j]) {
        blow += 1;
      }
    }
  }
  blow -= hit;
  console.log(hit);
  console.log(blow);
  req.session.renderData.msg = "半角英字で入力してください";
  req.session.renderData.content.push(pre);
  req.session.renderData.content1.push(hit);
  req.session.renderData.content2.push(blow);
  // クリア処理, 継続処理
  if (hit == 4) {
    var hand = req.session.renderData.content.length;
    req.session.renderData.msg = hand;
    var lv = req.session.renderData.lvl;
    //DB接続
    db.pool.connect(function(err, client) {
      if (err) {
        console.log(err);
      } else {
        var slct = 'SELECT id, name, hands, level FROM rank WHERE level = ' + lv + 'ORDER BY hands DESC;';
        client.query(slct, function(err, result) {
          console.log(result.rows);
          var lowest = result.rows[0];
          //ハイスコア更新時
          if (hand <= lowest.hands) {
            if (result.rows.length >= 10) {
              var dlt = "DELETE FROM rank WHERE id = " + lowest.id + ";";
              client.query(dlt, function(err, result) {
                if (err) {
                  console.log(err);
                }
              });
            }
            req.session.renderData.ejsfile = './partials/play_highscore.ejs';
            res.render('index', req.session.renderData);
          } else {
            //ハイスコアではないときの処理
            req.session.renderData.ejsfile = './partials/play_clear.ejs';
            res.render('index', req.session.renderData);
            delete req.session.renderData;
          }
        });
      }
    });
  } else {
    res.render('index', req.session.renderData);
  }
});

router.post('/game/clear', (req, res, next) => {
  var hand = req.session.renderData.msg;
  var lv = req.session.renderData.lvl;
  db.pool.connect((err, client) => {
    if (err) {
      console.log(err);
    } else {
      var userName = req.body['uName'];
      var insrt = "INSERT INTO rank (hands, name, level) VALUES (" + hand + ",'" + userName + "', " + lv + ");"
      client.query(insrt, (err, result) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
  req.session.renderData.ejsfile = './partials/play_clear.ejs';
  res.render('index', req.session.renderData);
  delete req.session.renderData;
});

module.exports = router;
