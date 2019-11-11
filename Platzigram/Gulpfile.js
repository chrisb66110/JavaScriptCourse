//Require busca en el direcctorio node_modules y va a obtener lo que nos exporte cada herramienta
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

//Tarea que preprocesa el index.scss y lo guarda en public
gulp.task('styles', () => {
    return gulp
        .src('index.scss')
        .pipe(sass())
        .pipe(rename('app.css'))
        .pipe(gulp.dest('public'));
});

//Tarea que copia lo de assets a public
gulp.task('assets', () => {
    return gulp
        .src('assets/*')
        .pipe(gulp.dest('public'));
});

//Funcion para
// watch: para indicar si hacemos watch
function compile(watch){
    //Nos devuelve un objeto que permite ver si hay cambios en los archivos
    var bundle = browserify('src/index.js', {debug: true});

    //Para saber si se quiere watchify
    if (watch){
        //Update, evento que indica que cambiaron los archivos, queda escuchando
        bundle = watchify(bundle);
        bundle.on('update', function () {
            console.log('--> Bundling..');
            return rebundle();
        });
    }
    
    function rebundle() {
        //Se le indica que lo transforme mediante babelify,
        // que genere el archivo,
        // se revisan si hay errores
        // lo pase por source(transforma lo del bundle(browserify) a algo que lo entienda gulp,
        //          nombre para instalar es 'npm i --save-dev vinyl-source-stream'),
        // se renombra el archivo generado,
        // se pasa a la carpeta public
        return bundle
            .transform(babel)
            .bundle()
            .on('error', function (error) {
                console.log(error);
                this.emit('end')
            })
            .pipe(source('index.js'))
            .pipe(rename('app.js'))
            .pipe(gulp.dest('public'));
    }

    return rebundle();
}

//Tarea para que gulp procese el archivo src/index.js
/*gulp.task('scripts', () => {
    //Se le indica cual archivo procesar,
    // que lo transforme mediante babelify,
    // que genere el archivo,
    // lo pase por source(transforma lo del bundle(browserify) a algo que lo entienda gulp,
    //          nombre para instalar es 'npm i --save-dev vinyl-source-stream'),
    // se renombra el archivo generado,
    // se pasa a la carpeta public
    return browserify('src/index.js')
        .transform(babel)
        .bundle()
        .pipe(source('index.js'))
        .pipe(rename('app.js'))
        .pipe(gulp.dest('public'));
});
*/

//Tarea de compulacion del proyecto
gulp.task('build', () => {
    return compile();
});

//Tarea del watchify para ver si hay cambios en los archivos y volver a compilar
gulp.task('watch', () => {
    return compile(true);
});

//Tarea que ejecuta las demas tareas
gulp.task('default', gulp.series(['styles', 'assets', 'build']));