// Requerimos page
var M = require('materialize-css');

var page = require('page');

//Requerimos empry
var empty = require('empty-element');

// requerimos el header
var header = require('../header');

// Requermios el template de usaurios
var template = require('./template');

var spinner = require('../spinner');



//Funcion para solicitar datos del usuario
async function loadUserInformation(ctx, next) {
    var user = ctx.params.id;
    try{
        ctx.userInformation = await fetch('/api/user/' + user).then((res)=> {return res.json()});
        next();
    }catch (err) {
        return console.log(err)
    }
}

//Funcion del link de la pagina del usuario
page('/:id', header, spinner, loadUserInformation, function (ctx, netx) {
    // El innerHTML es el contenido html que esta dentro de ese elemento
    // main.innerHTML =  'Signup <a href="/">Home</a>'; //que diga home

    //title permite cambiar el titulo de la pagina
    document.title = "Platzigram - " + ctx.userInformation.user.username;

    //main-container es una seccion que tenemos en views/index.js
    //   teniandola aqui podemos cambiar el contenido de esta seccion
    var main = document.getElementById('main-container');

    //empty borra lo que hay en main, luego asi main va a recibir element dentro de su contenido
    empty(main).appendChild(template(ctx.userInformation));
});

//Funcion del link de las fotos
page('/:id/:photo', header, spinner, loadUserInformation, function (ctx, netx) {
    // El innerHTML es el contenido html que esta dentro de ese elemento
    // main.innerHTML =  'Signup <a href="/">Home</a>'; //que diga home

    //title permite cambiar el titulo de la pagina
    document.title = "Platzigram - " + ctx.userInformation.user.username;


    //main-container es una seccion que tenemos en views/index.js
    //   teniandola aqui podemos cambiar el contenido de esta seccion
    var main = document.getElementById('main-container');

    //empty borra lo que hay en main, luego asi main va a recibir element dentro de su contenido
    empty(main).appendChild(template(ctx.userInformation));

    //Codigo para poder abrir los modals de las fotos
        //Esta primera parte hace como que permita que aparezaca nada mas
    //var elems = document.querySelectorAll('.modal');
    //var instances = M.Modal.init(elems);
        // Opciones del modal
    var options = {
        opacity: 0.5,
        onCloseEnd: function () {
            page(`/${ctx.userInformation.user.username}`);
        }
    };
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
    });
        //Esta segunda parte si hacemos que aparez, pero sin la primera no aparece
    var modalParaAbrir = document.getElementById(`modal-${ctx.params.photo}`);
    var instance = M.Modal.init(modalParaAbrir, options);
    instance.open();

    // Esto va a indicar que se habra el modal
    //$(`#modal-${ctx.params.photo}`).openModal();
});