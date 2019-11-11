// libreria para agregar interfaces de usuario, como una string para pasarlos a elementos de html
var yoyo = require('yo-yo');

// Requerimos la traducciones
var translate = require('../Translate');

// Asi esta variable va a tomar el valor de lo que exporte landing en ../landing
var landing = require('../landing');

// Formulario de signup
var singupForm = yoyo`<div class="col s12 m7">
  <div class="row">
    <div class="signup-box">
      <h1 class="platzigram">Platzigram</h1>
      <form class="signup-form">
        <h2>${translate.message('signup.subheading')}</h2>
        <div class="section">
          <a class="btn btn-fb hide-on-small-only">${translate.message('signup.facebook')}</a>
          <a class="btn btn-fb hide-on-med-and-up"><i class="fab fa-facebook-square"></i>${translate.message('signup.text')}</a>
        </div>
        <div class="divider"></div>
        <div class="section">
          <input type="email" name="email" placeholder="${translate.message('email')}"/>
          <input type="text" name="name" placeholder="${translate.message('fullname')}"/>
          <input type="text" name="username" placeholder="${translate.message('username')}"/>
          <input type="password" name="password" placeholder="${translate.message('password')}"/>
          <button class="btn waves-effect waves-light btn-signup" type="submit">${translate.message('signup.call-to-action')}</button>
        </div>
      </form>
    </div>
  </div>
  <div class="row">
    <div class="login-box">
      ${translate.message('signup.have-account')} <a href="/signin">${translate.message('signin')}</a>
    </div>
  </div>
</div>`;

//module es una variable que permite organizar el codigo en modulos, exports es lo que exporta este modulo
// asi este modulo exporta lo que devuelva landing y le agrega el formulario de signup en box para añadirlo a la pag
module.exports = landing(singupForm);