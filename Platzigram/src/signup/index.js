//Requiremos la libreria page
var page = require('page');
// libreria para eliminar cosas que le tengan en un elemento html
var empty = require('empty-element');
// importamos el template del archivos template.js
var template = require('./template');

//Funcion para definir la ruta de signup
// ctx:
// netx
page('/signup', (ctx, netx) => {
    // El innerHTML es el contenido html que esta dentro de ese elemento
    // main.innerHTML =  'Signup <a href="/">Home</a>'; //que diga home

    //title permite cambiar el titulo de la pagina
    document.title = "Platzigram - Singup";

    //main-container es una seccion que tenemos en views/index.js
     //   teniandola aqui podemos cambiar el contenido de esta seccion
    var main = document.getElementById('main-container');

    //asi main va a recibir element dentro de su contenido
    empty(main).appendChild(template);
});