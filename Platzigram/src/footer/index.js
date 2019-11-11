// Requerimos materialize para el dropdown de idioma
var M = require('materialize-css');

// requiere para los string de html
var yoyo = require('yo-yo');

// Requerimos la traducciones
var translate = require('../Translate');

var el = yoyo`<footer class="site-footer">
                  <div class="container">
                    <div class="row">
                      <div class="col s12 l3 center-align">
                        <a class='dropdown-trigger btn btn-flat' data-target='dropdown1'>${translate.message('language')}</a>
                        <ul id='dropdown1' class='dropdown-content'>
                          <li><a href="#!" onclick="${lang.bind(null, 'es')}">${translate.message('spanish')}</a></li>
                          <li><a href="#!" onclick="${lang.bind(null, 'en-US')}">${translate.message('english')}</a></li>
                        </ul>
                      </div>
                      <div class="col s12 l3 push-l6 center-align">© 2019 Platzigram</div>
                    </div>
                  </div>
                </footer>`;

//Funcion para cambiar el idioma
// Ojo que donde se llama la funcion utiliza bind, eso es para que no la llame cuando esta haciendo el codigo, si no que deje la referencia para que luego sea llamada
function lang(locale){
    //Almacena en el localstorage cual idioma seleccionó
    localStorage.locale = locale;
    //Recarga la paguna en la que estamos
    location.reload();
    return false;
}

document.body.appendChild(el);

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems);
});