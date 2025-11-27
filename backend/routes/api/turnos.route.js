var express = require('express')
var router = express.Router()
var TurnoController = require('../../controllers/turnos.controller');

// Rutas para turnos
// GET /api/turnos (opcional ?fecha=...)
router.get('/', TurnoController.getTurnos) 

// POST /api/turnos (crear)
router.post('/', TurnoController.createTurno)

// PUT /api/turnos/confirmar (confirmar)
router.put('/confirmar', TurnoController.confirmarTurno)

module.exports = router;