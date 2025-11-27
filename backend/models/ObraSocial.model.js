var mongoose = require('mongoose');

var ObraSocialSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

// Creamos el modelo
const ObraSocialModel = mongoose.model('ObraSocial', ObraSocialSchema);

// EXPORTAMOS EL MODELO
// ¡OJO! Debe ser 'module.exports' (con 's' al final)
module.exports = ObraSocialModel;