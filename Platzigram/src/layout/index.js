// libreria para agregar interfaces de usuario, como una string para pasarlos a elementos de html
var yoyo = require('yo-yo');

module.exports = function layout(content) {
    return yoyo`<div class="content">
                    ${content}
                </div>`;
};