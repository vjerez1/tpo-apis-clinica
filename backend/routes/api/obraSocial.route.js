var express = require('express')
var router = express.Router()
var ObraSocialController = require('../../controllers/obraSocial.controller');

// GET /api/obras (Lista todas)
router.get('/', ObraSocialController.getObras)

// POST /api/obras (Crea una nueva)
router.post('/', ObraSocialController.createObra)

// DELETE /api/obras/:id (Borra una por ID)
router.delete('/:id', ObraSocialController.deleteObra)

module.exports = router;