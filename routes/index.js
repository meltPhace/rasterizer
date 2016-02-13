var express = require('express');
var router = express.Router();
var fs = require('fs');
var images  = require('../data/images');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/getimages', function (req, res) {
	res.json(images);
});

router.post('/writeImage', function(req, res) {

	var path = req.path;
	var data = req.data;
	
	fs.writeFile(path, data,  function(err) {
		console.log("write current image to json file");
	   if (err) {
	       return console.error(err);
	   }
	   console.log("Data written successfully!");
	   console.log("Let's read newly written data");
	   fs.readFile('input.txt', function (err, data) {
	      if (err) {
	         return console.error(err);
	      }
	      console.log("Asynchronous read: " + data.toString());
	   });
	});
	
})

module.exports = router;