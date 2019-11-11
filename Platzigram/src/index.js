
/*
var numeros = [ 400, 200, 1, -23 ];

//Maps es un funcion que se ejecuta por cada elemento del array
//Asi se escribe sin utiliar ECMAScript 2015
var numeroMasUnoSin = numeros.map(function (numero) {
    return numero + 1;
});


//Asi se escribe con ECMAScript 2015
var numeroMasUnoCon = numeros.map((n) => n + 1 );

console.log(numeroMasUnoSin);
console.log(numeroMasUnoCon);

 */

//Requiremos la libreria page
var page = require('page');

//Se requiere para las fechas de moment para cambiar el idioma
//var moment = require('moment');
//require('moment/locale/es');
//moment.locale('es');

//Require los modulos, van en un cierto orden, ojo que llevan la direccion ./module
// la idea es separar el proyecto en modulos
require('./header');
require('./homepage');
require('./signup');
require('./signin');
require('./userpage');
require('./footer');

//Esto inicia page, para que defina las rutas
page();