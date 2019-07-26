//archivo de arranque de la aplicación

const express = require('express');
const morgan = require('morgan');
const expHandle = require('express-handlebars');
const path = require('path');
//const routes = require('./routes/index');
//inicializacion
const app = express();

//settings

//definiendo puerto, usa uno del SO o el 4000
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views')); //ubicacion de carpeta views(plantillas) 

//definir manejador de plantillas
app.engine('.hbs', expHandle({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');


//middleWares (funciones que se ejecutan cuando un cliente envia una peticion)

//se utiliza morgan para enviar mensajes por consola
app.use(morgan('dev'));
//para aceptar los datos que vengan en los formularios
app.use(express.urlencoded({ extended: false})); //acepta datos string
//para enviar y recibir json
app.use(express.json());

//variables globales
//definir variables para acceder desde cualquier parte de la aplicacion
app.use((req, res, next) => {
    next();
});

//routes
app.use(require('./routes/index'));
app.use(require('./routes/autentication'));
app.use('/links', require('./routes/links'));

//archivos publicos

//definir ruta donde se alojaran los archivos estaticos (css,)
app.use(express.static(path.join(__dirname, 'public')));

//start server
app.listen(app.get('port'), () => {
    console.log('Server on Port ', app.get('port'));
});