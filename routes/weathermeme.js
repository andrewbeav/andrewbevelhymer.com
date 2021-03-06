// Dependencies
var express = require('express');
var router = express.Router();
var path = require('path');
var PythonShell = require('python-shell');

// route to get the images
router.get('/memes/:image', function(req, res, next) {
	let imageName = req.params.image;

	res.sendFile(path.join(__dirname, '../res/weathermeme/memes/' + imageName));
});

// Route for api
router.get('/api', function(req, res, next) {
	var apiKey, lat, lon;
	if (req.query.owm_appid) {
		apiKey = req.query.owm_appid;
	} else {
		res.send("Need Api Key");
	}
	if (req.query.lat && req.query.lon) {
		lat = req.query.lat;
		lon = req.query.lon;
	} else {
		res.send("Need location");
	}

	var pythonShellOptions = {
		mode: 'text',
		pythonPath: '/usr/bin/python',
		scriptPath: './weathermeme_engine',
		args: [apiKey, lat, lon]
	}

	var pyshell = new PythonShell('weathermeme.py', pythonShellOptions);

	var weathermemeJsonString;

	pyshell.on('message', function(message) {
		weathermemeJsonString = message;
	});

	pyshell.end(function(err) {
		if (err) res.send(err); // TODO more specific error checking
		else {
			//res.sendFile(path.join(__dirname, '../res/weathermeme/memes/' + weathermemeString + '.png'));

			let weathermemeJson = JSON.parse(weathermemeJsonString);
			res.send(weathermemeJson);
		}
	});
});

module.exports = router;
