module.exports.toFahrenheit = function f(temperatureCelsius) {
	return (temperatureCelsius * (9.0/5.0)) + 32;
};
module.exports.toCelsius = function f(temperatureFahrenheit) {
	return (temperatureFahrenheit - 32) * (5.0/9.0);
};