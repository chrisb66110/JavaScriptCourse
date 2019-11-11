// requerimos yoyo
var yoyo = require('yo-yo');
// requerimos el layout
var layout = require('../layout');
//Requerimos el traductor
var translate = require('../Translate');

//Esta funcion debera recibir por parametro la informacion del usuario
module.exports = function (user) {
    //Template
    var template;

    //Funcion para hacer una imagen
    function image(imagea, imagePerRow, booleanFirst){

        //Funcion para hacer like y dislike
        function like(liked, modalActivo, urlIma) {
            console.log('liked');
            imagea.liked = liked;
            imagea.likes += liked? 1 : -1;
            if(!modalActivo) {
                //Caso cuando son los likes de la pagina del usuario
                var newEl = render(user);
                yoyo.update(template, newEl);
            }else{
                //Caso donde son los likes del modal de la imagen
                //Cambio la clase del div para ponerlo en liked o disliked segun corresponda
                document.getElementById(`likes-${urlIma}`).classList.toggle('liked');
                //Hago el nuevo span para actualizar el numero de likes
                var numLikes = yoyo`<span id="numLikes-${urlIma}" class="likes"> ${translate.message('likes', {likes: imagea.likes})}</span>`;
                //Pido el span viejo
                var viejo = document.getElementById(`numLikes-${urlIma}`);
                //Le digo a yoyo que cambie el span viejo por el span nuevo
                yoyo.update(viejo, numLikes);
            }
            return false;
        }

        //Div para toda la imagen y texto
        var imageHtml = yoyo`<div></div>`;
        //Imagen
        var imageOnly = yoyo`<img src="${imagea.url}" class="photos"/>`;
        //Texto de los likes de la imagen, con funciones de like y dislike
        var text = yoyo`<div class="likes-image ${imagea.liked ? 'liked' : ''}">
                            <a onclick=${like.bind(null, true, false, null)}><i class="far fa-heart" aria-hidden="true"></i></a>
                            <a onclick=${like.bind(null, false, false, null)}><i class="fas fa-heart" aria-hidden="true"></i></a>
                            <span class="likes"> ${imagea.likes}</span>
                        </div>`;
        //Div de la imagen donde se va a meter, varios casos para acomodarla dependiendo de la cantidad por fila
        var divImage;
        if(imagePerRow === 3){
            //Caso donde son 3 imagenes
            divImage = yoyo`<div class="col s4 m4 l4 center-align darker-image"></div>`;
        }else {
            //Caso donde son 2 imagenes
            if (imagePerRow === 2) {
                //Caso para la primer imagen que lleva el offset
                if(booleanFirst){
                    divImage = yoyo`<div class="col s4 offset-s2 m4 offset-m2 l4 offset-l2 center-align darker-image"></div>`;
                }else{
                    //Caso para la segunda imagen que no lleva el offset
                    divImage = yoyo`<div class="col s4 m4 l4 center-align darker-image"></div>`;
                }
            }else{
                //Caso donde es solo una imagen
                divImage = yoyo`<div class="col s4 offset-s4 m4 offset-m4 l4 offset-l4 center-align darker-image"></div>`;
            }
        }
        //Modal
        var modal = yoyo`<div id="modal-${imagea.id}" class="modal modal-fixed-footer">
                            <div class="modal-content">
                                <img src="${imagea.url}"/>
                            </div>
                            <div class="modal-footer">
                                <div id="likes-${imagea.url}" class="btn-flat ${imagea.liked ? 'liked' : ''}">
                                    <a onclick=${like.bind(null, true, true, imagea.url)}><i class="far fa-heart" aria-hidden="false"></i></a>
                                    <a onclick=${like.bind(null, false, true, imagea.url)}><i class="fas fa-heart" aria-hidden="true"></i></a>
                                    <span id="numLikes-${imagea.url}" class="likes"> ${translate.message('likes', {likes: imagea.likes})}</span>
                                </div>
                            </div>
                        </div>`;
        //link al modal
        var link = yoyo`<a href="/${user.user.username}/${imagea.id}"></a>`;
        //Agrego la imagen al link de imagen con texto de likes
        link.appendChild(imageOnly);
        //Agrego el comentario al link imagen con texto de likes
        link.appendChild(text);
        //Agregamos el link al div del link con el modal
        divImage.appendChild(link);
        //Agregamos el modal
        divImage.appendChild(modal);
        //Agrego el div de imagen y texto al div principal
        imageHtml.appendChild(divImage);
        return imageHtml;
    }

    //Funcion para hacer una fila
    function imagesRow(arrayImage, from, to){
        //Defino el div de una fila porque solo puedo añadirle cosas a un elemento
        var row = yoyo`<div></div>`;
        var booleanFirst = true;
        for(var i = from; i < to; i++){
            //Mando a hacer una fila
            var imageReturned = image(arrayImage[i], to - from, booleanFirst);
            //Le agrego una foto a la fila
            row.appendChild(imageReturned);
            booleanFirst = false;
        }
        return row;
    }

    //Funcion para hacer todas las filas
    function imagesAll(arrayImage){
        //Defino el elemento de todas las filas
        var rows = yoyo`<div></div>`;
        for(var i = 0; i < arrayImage.length; i++){
            //Defino el elemento de una fila
            var defineRow = yoyo`<div class="row publications"></div>`;
            //Añado la fila de fotos
            rows.appendChild(defineRow);
            if(i + 3 <= arrayImage.length){
                //Agrego 3 imagenes a la fila
                defineRow.appendChild(imagesRow(arrayImage, i, i+3));
                //Se aumentan 2 porque al dar la vuelta se aumenta otro
                i += 2;
            }else{
                if(i + 2 <= arrayImage.length){
                    //Agrego 2 imagenes a la fila
                    defineRow.appendChild(imagesRow(arrayImage, i, i+2));
                    //Se aumentan 1 porque al dar la vuelta se aumenta otro
                    i ++;
                }else{
                    if(i + 1 <= arrayImage.length){
                        //Agrego 1 imagenes a la fila
                        defineRow.appendChild(imagesRow(arrayImage, i, i+1));
                    }
                }
            }
        }
        return rows;
    }

    //Funcion para mandar a renderizar la pantalla
    function render(user) {
        //Template de la pagina de usuarios
        return yoyo`<div class="container">
                        <div class="row">
                            <div class="col s12 m10 offset-m1 l8 offset-l2 center-align user-info">
                                <img src="${user.user.avatar}" class="avatar"/>
                                <span class="username">${user.user.username}</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12 m10 offset-m1 l8 offset-l2 center-align publications">
                                ${translate.message('publications')}
                            </div>
                        </div>
                        <div>
                            ${imagesAll(user.photos)}
                        </div>
                    </div>`;
    }
    //Renderizamos
    template = render(user);
    //Agregamos el layout
    return layout(template);
};