// Importación de módulos necesarios
var express = require('express');              // Framework web para Node.js
var cookieParser = require('cookie-parser');  // Middleware para parsear cookies
var bluebird = require('bluebird');           // Promesas mejoradas para JS

//incorporo cors
var cors = require('cors'); // Middleware para habilitar CORS

// Importación de routers personalizados
var indexRouter = require('./routes/index');  // Rutas base
var apiRouter = require('./routes/api');      // Rutas API específicas del sistema

// Creación de la instancia de la aplicación Express
var app = express();

// Middleware para interpretar JSON y datos de formularios URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Habilita CORS para todas las rutas
app.use(cors());

// Middleware para parsear cookies
app.use(cookieParser());

// Middleware personalizado para configurar cabeceras CORS más específicas
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


// Definición de rutas
app.use('/api', apiRouter);   // Las rutas que comienzan con /api usarán el router apiRouter
app.use('/', indexRouter);    // Las rutas base usarán el router indexRouter

// Carga la configuración si el entorno es "Development"
if (process.env.NODE_ENV === 'Development') {
  require('./config').config();
}



// --- INICIO DEL REEMPLAZO ---
var mongoose = require('mongoose')
mongoose.Promise = bluebird;

// Aquí está la magia: Si no lee el .env, usa la dirección local por defecto
// Esto arregla el error "undefined"
let url = process.env.MONGODB_URI || 'mongodb://localhost:27017/consultorioDB';

console.log("Intentando conectar a BD:", url);

let opts = {
  useNewUrlParser : true, 
  useUnifiedTopology: true
};

mongoose.connect(url, opts)
  .then(() => {
    console.log(`✅ ¡Conexión exitosa a MongoDB Local!`)
  })
  .catch((e) => {
    console.log(`❌ Error conectando a la base de datos...`),
    console.log(e)
  })
// --- FIN DEL REEMPLAZO ---


// Setup server port
var port = process.env.PORT || 8080;
// Escuchar en el puerto
app.listen(port,()=>{
    console.log('Servidor de ABM Users iniciado en el puerto ',port);
});


module.exports = app;