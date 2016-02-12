var express = require('express');
var router = express.Router();
var images  = require('../data/images');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/getimages', function (req, res) {
	res.json(images);
});

module.exports = router;