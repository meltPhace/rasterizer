var express = require('express');
var router = express.Router();
/*var paper = require("public\javascripts\paper-full.min.js");*/

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
