/*
var page = require('page');

//Funcion para definir la ruta raiz
// ctx:
// netx
page('/', (ctx, netx) => {
    // El innerHTML es el contenido html que esta dentro de ese elemento
    //main.innerHTML =  'Home <a href="/signup">Signup</a>';//que diga home

    var main = document.getElementById('main-container');
    main.innerHTML =  '<a href="/signup">Signup</a>';//que diga home
});

 */
//Requiremos la libreria page
var page = require('page');
// libreria para eliminar cosas que le tengan en un elemento html
var empty = require('empty-element');
// importamos el template del archivos template.js
var template = require('./template');
// importamos para los request
var requestSuperAgent = require('superagent');
// requerimos el header
var header = require('../header');
// importamos axiso
var requestAxios = require('axios');
//requerimos el spinner
var spinner = require('../spinner');
// Requerimos materialize para los modal
var M = require('materialize-css');

//Funcion para definir la ruta de signup
// ctx:
// netx
page('/', header, spinner, loadPicturesFetchAsyncAWait, function (ctx, netx) {
    // El innerHTML es el contenido html que esta dentro de ese elemento
    // main.innerHTML =  'Signup <a href="/">Home</a>'; //que diga home

    //title permite cambiar el titulo de la pagina
    document.title = "Platzigram";

    //main-container es una seccion que tenemos en views/index.js
    //   teniandola aqui podemos cambiar el contenido de esta seccion
    var main = document.getElementById('main-container');



    //empty borra lo que hay en main, luego asi main va a recibir element dentro de su contenido
    empty(main).appendChild(template(ctx.pictures));

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
    });
});

//ctx permite compartir datos entre los midwares, es decir de donde llamamos la funcion tendremos acceso en la siguiente funcion al elemento pictures
// En este se está usando SuperAgent, si quiero usar esta funcion deberia ponerla en el tercer parametro de page, pues es la segunda funcion que se ejecuta
function loadPictures(ctx, next) {
    requestSuperAgent
        .get('/api/pictures')
        .end(function (err, res) {
            if(err){
                return console.log(err);
            }
            ctx.pictures = res.body;
            next();
        });
}


//ctx permite compartir datos entre los midwares, es decir de donde llamamos la funcion tendremos acceso en la siguiente funcion al elemento pictures
// En este se está usando Axios, si quiero usar esta funcion deberia ponerla en el tercer parametro de page, pues es la segunda funcion que se ejecuta
function loadPicturesAxios(ctx, next) {
    requestAxios
        .get('/api/pictures')
        .then(function (res) {
            ctx.pictures = res.data;
            next();
        })
        .catch(function (err) {
            console.log(err);
        });
}

//ctx permite compartir datos entre los midwares, es decir de donde llamamos la funcion tendremos acceso en la siguiente funcion al elemento pictures
// En este se está usando Fetch, si quiero usar esta funcion deberia ponerla en el tercer parametro de page, pues es la segunda funcion que se ejecuta
function loadPicturesFetch(ctx, next) {
    fetch('/api/pictures')
        .then(function (res) {
            return res.json();
        })
        .then(function (pictures) {
            ctx.pictures = pictures;
            next();
        })
        .catch(function (err) {
            console.log(err);
        });
}


//ctx permite compartir datos entre los midwares, es decir de donde llamamos la funcion tendremos acceso en la siguiente funcion al elemento pictures
// En este se está usando Fetch con ASINCAWAIT, si quiero usar esta funcion deberia ponerla en el tercer parametro de page, pues es la segunda funcion que se ejecuta
async function loadPicturesFetchAsyncAWait(ctx, next) {
    try{
        ctx.pictures = await fetch('/api/pictures').then((res)=> {return res.json()});
        next();
    }catch (err) {
        return console.log(err)
    }
}