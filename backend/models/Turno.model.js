var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var TurnoSchema = new mongoose.Schema({
    paciente: String,
    telefono: String,
    email: String,
    obraSocial: String,
    fecha: String,   // Guardamos como String "DD/MM/YYYY" o ISO, según venga del front
    hora: String,
    estado: {
        type: String,
        default: 'Solicitado' // Valores: 'Solicitado', 'Confirmado', 'Cancelado'
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
})

TurnoSchema.plugin(mongoosePaginate)
const Turno = mongoose.model('Turno', TurnoSchema)

module.exports = Turno;