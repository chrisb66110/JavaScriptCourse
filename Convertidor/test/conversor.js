/*
* Module dependencies
* */

//we require expect from chai to compare values
var expect = require('chai').expect;

//We require converter to test it
// require ('..') what it does is look at the package.json which is the main
var converter = require('..');

//Function to do test, where they describe that we are going to test
describe('Temperature Conversor', function () {
	//We tried to convert from Celsius to Fahrenheit
	describe('Celsius to Fahrenheit conversion', function () {
		//We say the function that we are going to test
		it('Converts 100C to Fahrenheit', function () {
			//We ask the result to the converter
			var fh = converter.toFahrenheit(100);
			expect(fh).to.equal(212);
		});
	});
	//We tried to convert from Fahrenheit to Celsius
	describe('Fahrenheit to Celsius conversion', function () {
		//We say the function that we are going to test
		it('Converts 212F to Celsius', function () {
			//We ask the result to the converter
			var fh = converter.toCelsius(212);
			expect(fh).to.equal(100);
		});
	});
});