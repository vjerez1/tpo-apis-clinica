var ObraSocialService = require('../services/obraSocial.service');

_this = this

exports.getObras = async function (req, res, next) {
    try {
        // Traemos todas las obras
        var obras = await ObraSocialService.getObras({});
        return res.status(200).json(obras);
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.deleteObra = async function (req, res, next) {
    var id = req.params.id; // Leemos el ID desde la URL
    try {
        await ObraSocialService.deleteObra(id);
        return res.status(200).json({status: 200, message: "Obra Social eliminada"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.createObra = async function (req, res, next) {
    
    // --- AGREGAR ESTE LOG ---
    console.log("--> Recibí petición para crear Obra Social:", req.body); 

    if (!req.body.nombre) {
        return res.status(400).json({status: 400, message: "El nombre es obligatorio"});
    }
    
    var obra = {
        nombre: req.body.nombre
    }
    
    try {
        var createdObra = await ObraSocialService.createObra(obra)
        return res.status(201).json({createdObra, message: "Obra Social creada exitosamente"})
    } catch (e) {
        // --- AGREGAR ESTE LOG ---
        console.error("--> Error guardando en Mongo:", e.message);
        
        return res.status(400).json({status: 400, message: "Error creando obra social (Verifica duplicados)"})
    }
}