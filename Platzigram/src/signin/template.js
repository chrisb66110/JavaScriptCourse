// libreria para agregar interfaces de usuario, como una string para pasarlos a elementos de html
var yoyo = require('yo-yo');

// Asi esta variable va a tomar el valor de lo que exporte landing en ../landing
var landing = require('../landing');

// Requerimos la traducciones
var translate = require('../Translate');

// Formulario de signup
var singinForm = yoyo`<div class="col s12 m7">
  <div class="row">
    <div class="signup-box">
      <h1 class="platzigram">Platzigram</h1>
      <form class="signup-form">
        <div class="section">
          <a class="btn btn-fb hide-on-small-only">${translate.message('signup.facebook')}</a>
          <a class="btn btn-fb hide-on-med-and-up"><i class="fab fa-facebook-square"></i>${translate.message('signup.text')}</a>
        </div>
        <div class="divider"></div>
        <div class="section">
          <input type="text" name="username" placeholder="${translate.message('username')}"/>
          <input type="password" name="password" placeholder="${translate.message('password')}"/>
          <button class="btn waves-effect waves-light btn-signup" type="submit">${translate.message('signup.text')}</button>
        </div>
      </form>
    </div>
  </div>
  <div class="row">
    <div class="login-box">
      ${translate.message('signin.no-have-account')} <a href="/signup">${translate.message('signup.call-to-action')}</a>
    </div>
  </div>
</div>`;

//module es una variable que permite organizar el codigo en modulos, exports es lo que exporta este modulo
// asi este modulo exporta lo que devuelva landing y le agrega el formulario de signup en box para añadirlo a la pag
module.exports = landing(singinForm);