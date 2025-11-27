var ObraSocial = require('../models/ObraSocial.model');

console.log("=======================================");
console.log("TIPO DE DATO RECIBIDO:", typeof ObraSocial);
console.log("CONTENIDO REAL:", ObraSocial);
console.log("=======================================");

_this = this


exports.getObras = async function (query, page, limit) {
    // Si queremos traer todas sin paginar (para el dropdown del frontend), usamos find() directo
    try {
        var obras = await ObraSocial.find(query).sort({nombre: 1}); // Ordenadas alfabéticamente
        return obras;
    } catch (e) {
        throw Error('Error al buscar obras sociales');
    }
}

exports.createObra = async function (obra) {
    var newObra = new ObraSocial({
        nombre: obra.nombre
    })

    try {
        var savedObra = await newObra.save();
        return savedObra;
    } catch (e) {
        throw Error("Error al crear obra social (quizás ya existe)");
    }
}

exports.deleteObra = async function (id) {
    try {
        var deleted = await ObraSocial.deleteOne({ _id: id });
        if (deleted.deletedCount === 0) {
            throw Error("No se encontró la obra social para borrar");
        }
        return deleted;
    } catch (e) {
        throw Error("Error al borrar la obra social");
    }
}