var express = require('express');
var router = express.Router();

var user;



router.post('/isLogin', function (req, res, next) {
  user = req.body.user;
  res.render('')
});



function isLogin(req, res, next) {
  if (user) {
    next();
  }
  else {
    res.redirect('/')
  }
}
router.post('/isLogin', function(req, res, next) {
  user = req.body.user
  res.json(user);
});


router.get('/status', isLogin, function(req, res, next) {
  user = req.body.user
  res.json(user);
});
router.get('/call-history', isLogin, function(req, res, next) {
  user = req.body.user
  res.json(user);
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/xyz', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
module.exports = router;
