// libreria para agregar interfaces de usuario, como una string para pasarlos a elementos de html
var yoyo = require('yo-yo');

// Requerimos la traducciones
var translate = require('../Translate');

// requerimos empty-element
var empty = require('empty-element');


var el = yoyo`<nav class="header">
                    <div class="nav-wrapper">
                        <div class="container">
                            <div class="row">
                                <div class="col s10 m10 offset-m1">
                                    <a href="/" class="brand-logo platzigram">Platzigram</a>
                                </div>
                                <div class="col s2 m2 push-m10">
                                    <a class='dropdown-trigger btn btn-large btn-flat' data-target='drop-user'>
                                        <i class="fas fa-user"></i>
                                    </a>
                                    <ul id="drop-user" class="dropdown-content">
                                        <li><a>${translate.message('logout')}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>`;

module.exports =  function header(ctx, next) {
    var container = document.getElementById('header-container');
    empty(container).appendChild(el);
    next();
};
