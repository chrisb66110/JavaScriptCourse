var express = require('express');
var converter = require('..');

var app = express();


app.get('/toCelsius', function (req, res) {
	//req.query allows us to obtain the parameters that come after the question mark
	var temperature = req.query.temperature;
	res.send(200, converter.toCelsius(temperature))
});

app.get('/toFahrenheit', function (req, res) {
	//req.query allows us to obtain the parameters that come after the question mark
	var temperature = req.query.temperature;
	res.send(200, converter.toFahrenheit(temperature))
});

app.listen(3000);