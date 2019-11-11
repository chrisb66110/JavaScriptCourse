// libreria para agregar interfaces de usuario, como una string para pasarlos a elementos de html
var yoyo = require('yo-yo');

// Requerimos la traducciones
var translate = require('../Translate');

// requerimos empty-element
var empty = require('empty-element');

var el = yoyo`<div class="spinner"><div class="loader">Loading...</div></div>`;

module.exports =  function header(ctx, next) {
    var container = document.getElementById('main-container');
    empty(container).appendChild(el);
    next();
};