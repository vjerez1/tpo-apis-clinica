var express = require('express')
var router = express.Router()
var users = require('./api/user.route')
var turnos = require('./api/turnos.route')
var obras = require('./api/obraSocial.route') // <--- NUEVO

router.use('/users', users);
router.use('/turnos', turnos);
router.use('/obras', obras); // <--- NUEVO (La ruta será /api/obras)

module.exports = router;