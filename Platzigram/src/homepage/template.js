// libreria para agregar interfaces de usuario, como una string para pasarlos a elementos de html
var yoyo = require('yo-yo');
// requerimos el layout
var layout = require('../layout');
// requerimos el modulo de picture
var picture = require('../picture-card');
// requerimos translate
var translate = require('../Translate');
// requerimos superagent
var superAgent = require('superagent');
//requerimos la webcamjs
var Webcam = require('webcamjs');
// Requerimos materialize para los modal
var M = require('materialize-css');
// requerimos empty
var empty = require('empty-element');

//module es una variable que permite organizar el codigo en modulos, exports es lo que exporta este modulo
module.exports = function (pictures) {
    // Formulario de homepage
//  pictures es un array de modulos de pictures
    template = yoyo`<div class="container timeline">
                        <!-- Modal Trigger 
                        <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>-->                        
                        <!-- Modal Structure -->
                        <div id="modalCamara" class="modal">
                            <div class="modal-content">
                                <div id="camara-input" class="camara-input"></div>
                                <div id="camara-preview" class="camara-output hide"></div>
                            </div>
                            <div class="modal-footer">
                                <button class="waves-effect waves-light btn shootButton" id="shoot">
                                    <i class="fas fa-camera"></i>
                                </button>
                                <button class="waves-effect waves-light cyan btn shootButton hide" id="uploadButton">
                                    <i class="fas fa-upload"></i>
                                </button>
                                <button class="waves-effect waves-light red btn shootButton hide" id="cancelPicture">
                                    <i class="far fa-times-circle"></i>
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12 m10 offset-m1 l8 offset-l2 center-align">
                                <form enctype="multipart/form-data" class="form-upload" id="formUpload" onsubmit="${onsubmit}">
                                    <a class="waves-effect waves-light btn" onclick="${openmodal}">
                                        <i class="fas fa-camera"></i>
                                    </a>
                                    <div id="fileName" class="fileUpload btn-flat cyan">
                                        <span><i class="fas fa-upload"></i> ${translate.message('upload-picture')}</span>
                                        <input name="picture" id="file" type="file" class="upload" onchange="${onchange}"/>
                                    </div>
                                    <button id="btnUpload" type="submit" class="btn btn-flat cyan hide">${translate.message('upload')}</button>
                                    <button id="btnCancel" type="button" class="btn btn-flat red hide" onclick="${cancel}"><i class="far fa-times-circle"></i></button>
                                </form>
                            </div>
                        </div>
                        <div class="row">
                            <div id="timeline" class="col s12 m10 offset-m1 l6 offset-l3">
                                ${pictures.map(function (pic) {
                                    return picture(pic);
                                })}
                            </div>
                        </div>
                    </div>`;

    //Funcion para cambiar los botones para el preview
    function togglePreview() {
        //cambiamos la camara y el preview
        document.getElementById('camara-input').classList.toggle('hide');
        document.getElementById('camara-preview').classList.toggle('hide');
        //Cambiamos los botones
        document.getElementById('uploadButton').classList.toggle('hide');
        document.getElementById('cancelPicture').classList.toggle('hide');
        document.getElementById('shoot').classList.toggle('hide');
    }

    //Funcion para abrir el modal de la camara
    function openmodal() {
        //Declaro la instancia del modal aqui, para poder cerrarlo en las opciones
        var instanceCameraModal;
        //Opciones del modal
        var options = {
            onOpenStart: function() {
                //Configuramos la camara
                Webcam.set({
                    width: 600,
                    height: 390,
                    image_format: 'jpeg',
                    jpeg_quality: 100,
                    force_flash: false,
                    flip_horiz: true,
                    fps: 45
                });
                //Mostramos la camara
                Webcam.attach( '#camara-input' );
                //Agregamos el evento para tomar la foto
                document.getElementById('shoot').onclick = function () {
                    //Capturamos la imagen
                    Webcam.snap( function(data_uri) {
                        document.getElementById('camara-preview').innerHTML = '<img id="preview-picture" src="'+data_uri+'"/>';
                        //Agregamos evento de click para upload
                        document.getElementById('uploadButton').onclick = function () {
                            const pic = {
                                user: {
                                    username: 'christofer',
                                    avatar: 'https://scontent.fsyq1-1.fna.fbcdn.net/v/t1.0-9/11248247_860492034003920_4254103667573577246_n.jpg?_nc_cat=102&_nc_oc=AQmN9LGkTVuLQXFuAUIL672y0W8EMAu0MJHRMSdbmoNucpJtjQC80gd-oHwsCQosm1A&_nc_ht=scontent.fsyq1-1.fna&oh=0df1264c9f4d45726cbf0380e3102ed0&oe=5E063015'
                                },
                                url: data_uri,
                                likes: 0,
                                liked: false,
                                createdAt: new Date().getTime(),
                            };
                            var timeline = document.getElementById('timeline');
                            timeline.prepend(picture(pic));
                            instanceCameraModal.close();
                        };
                        //Agregamos el evento para cancelar
                        document.getElementById('cancelPicture').onclick = function () {
                            //Ocultamos la imagen por la camera
                            togglePreview();
                            //Borramos la imagen dentro de camara-preview
                            empty(document.getElementById('camara-preview'));
                        };
                    } );
                    //Cambiamos la camara por la imagen
                    togglePreview();
                };
            },
            onCloseStart: function() {
                Webcam.reset();
                console.log('pase por aca');
                //vemos si la imagen habia sido tomada, si si lo mandamos a acultar, sino no

                var imgVisible = document.getElementById('camara-input').classList.contains('hide');
                if( imgVisible ){
                    togglePreview();
                }
            }
        };
        //Obtenemos el div de la camara y lo abrimos
        var camera = document.getElementById('modalCamara');
        instanceCameraModal = M.Modal.init(camera, options);
        instanceCameraModal.open();
    }

    //Funcion de agregar o quitar el hide de los botones
    function toggleButtons() {
        document.getElementById('fileName').classList.toggle('hide');
        document.getElementById('btnUpload').classList.toggle('hide');
        document.getElementById('btnCancel').classList.toggle('hide');
    }

    //Funcion para ocultar y poner los botones cuando se quiere subir una imagen
    function onchange() {
        toggleButtons();
    }

    // funtion para cancelar una subida de imagen
    function cancel() {
        toggleButtons();
        document.getElementById('formUpload').reset();
    }
    
    //Funcion para mandar la imagen
    //El evento de onsubmit se da cuando se hace click en un boton dentro del formulario que tenga el type submit
    function onsubmit(ev) {
        // con preventDefault se hace que no se ejecute el evento
        ev.preventDefault();
        // asi tomamdos los datos del formulario, this en este caso es el formulario porque el formulario es quien llama este evento
        var data = new FormData(this);
        // Vamos a usar SuperAgent para hacer el request al server
        superAgent
            .post('/api/pictures')
            .send(data)
            .end(function (err, res) {
                // en todas las funciones tenemos una variable llamada arguments que
                // tiene un array de todos los parametros que le entran a la funcion, en este caso seria err y res
                console.log(arguments);
            });
    }

    //Agregamos el layout
    return layout(template);
};