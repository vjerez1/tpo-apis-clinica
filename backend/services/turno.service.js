var Turno = require('../models/Turno.model');

_this = this

exports.getTurnos = async function (query, page, limit) {
    var options = {
        page,
        limit
    }
    try {
        var turnos = await Turno.paginate(query, options)
        return turnos;
    } catch (e) {
        throw Error('Error while Paginating Turnos');
    }
}

exports.createTurno = async function (turno) {
    var newTurno = new Turno({
        paciente: turno.paciente,
        telefono: turno.telefono,
        email: turno.email,
        obraSocial: turno.obraSocial,
        fecha: turno.fecha,
        hora: turno.hora,
        estado: 'Solicitado'
    })

    try {
        var savedTurno = await newTurno.save();
        return savedTurno;
    } catch (e) {
        throw Error("Error while Creating Turno")
    }
}

exports.confirmTurno = async function (id) {
    try {
        var turno = await Turno.findById(id);
        if (!turno) return false;
        
        turno.estado = "Confirmado";
        var savedTurno = await turno.save();
        return savedTurno;
    } catch (e) {
        throw Error("Error occured while confirming the Turno");
    }
}

exports.deleteTurno = async function (id) {
    try {
        var deleted = await Turno.remove({ _id: id })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Turno Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Turno")
    }
}