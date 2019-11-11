//we require expect for comparisons
var expect = require('chai').expect;
var axios = require('axios');

//We test the converter's api
describe('Temperature conversor API', function () {
	//We tested the endpoint and resp of the endpoint of to Fahrenheit
	describe('Celsius to Fahrenheit conversion', function () {
		//We prove that the status is 200
		it('return status 200', function (done) {
			/*With the promises you have to be careful in the tests,
			because the tests are executed so fast that the server's response has not arrived,
			this is because the function of the test is asicronous,
			then this function should receive a callback (another function that will be executed when the resp arrives,
			in this case "done", this done is not provided by mocha, what it does is wait until that function is executed,
			and if it does not run it gives error)*/
			axios
				.get('http://localhost:3000/toFahrenheit?temperature=100')
				.then(function (res) {
					expect(res.status).to.equal(200);
					done();
				});
		});
		//We test the return value
		it('return 100C in Fahrenheit', function (done) {
			axios
				.get('http://localhost:3000/toFahrenheit?temperature=100')
				.then(function (res) {
					expect(res.data).to.equal(212);
					done();
				});
		});
	});
	//We tested the endpoint and resp of the endpoint of to Celsius
	describe('Fahrenheit to Celsius conversion', function (done) {
		//We prove that the status is 200
		it('return status 200', function (done) {
			axios
				.get('http://localhost:3000/toCelsius?temperature=212')
				.then(function (res) {
					expect(res.status).to.equal(200);
					done();
				});
		});
		//We test the return value
		it('return 212F in Celsius', function (done) {
			axios
				.get('http://localhost:3000/toCelsius?temperature=212')
				.then(function (res) {
					expect(res.data).to.equal(100);
					done();
				});
		});
	})
});