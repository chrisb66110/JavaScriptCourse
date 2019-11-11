// Para las fechas
var IntlRelativeFormat = require('intl-relativeformat');
// Para los mensajes
var IntlMessageFormat = require('intl-messageformat');

//Traducciones de mensajes
var es = require('./es');
var en = require('./en-US');

//Mensajes
var MESSAGES = {};
MESSAGES['es'] = es;
MESSAGES['en-US'] = en;

//Idioma actual
// los || es una tecnica para decir que si localStorage.locale no exite entonces que tome 'es'
var locade = localStorage.locale || 'es';


module.exports = {
    message: function(text, options={}){
        var msgFormat = new IntlMessageFormat.IntlMessageFormat(MESSAGES[locade][text],locade);
        return msgFormat.format(options);
    },
    date: new IntlRelativeFormat(locade)
};