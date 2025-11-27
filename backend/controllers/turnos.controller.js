var TurnoService = require('../services/turno.service');
var EmailService = require('../services/email.service'); // <--- AGREGAR

_this = this

exports.getTurnos = async function (req, res, next) {
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 100; // Traemos muchos por defecto
    
    // Filtro por fecha si viene en la URL (?fecha=...)
    let query = {};
    if (req.query.fecha) {
        query.fecha = req.query.fecha;
    }

    try {
        var turnos = await TurnoService.getTurnos(query, page, limit)
        // Devolvemos solo la lista 'docs' para facilitar al frontend, o el objeto completo paginado
        return res.status(200).json(turnos.docs); 
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createTurno = async function (req, res, next) {
    
    // --- TRAMPA 1: VER QUÉ LLEGA ---
    console.log("========================================");
    console.log("--> INTENTO DE CREAR TURNO");
    console.log("--> DATOS RECIBIDOS:", req.body);
    console.log("========================================");

    var turno = {
        paciente: req.body.paciente,
        telefono: req.body.telefono,
        email: req.body.email,
        obraSocial: req.body.obraSocial,
        fecha: req.body.fecha,
        hora: req.body.hora
    }

    try {
        var createdTurno = await TurnoService.createTurno(turno);
        
        // Intento de envío de mail (si falla no rompe el turno)
        if (createdTurno.email) {
             try {
                await EmailService.enviarCorreo(
                    createdTurno.email,
                    "Turno Solicitado",
                    `Hola ${createdTurno.paciente}, tu turno para el ${createdTurno.fecha} a las ${createdTurno.hora} ha sido solicitado.`
                );
             } catch (mailError) {
                 console.error("Error enviando mail (no crítico):", mailError);
             }
        }

        return res.status(201).json({createdTurno, message: "Turno creado exitosamente"});
    } catch (e) {
        // --- TRAMPA 2: VER EL ERROR REAL ---
        console.error("--> ❌ ERROR EN MONGOOSE:", e); 
        return res.status(400).json({status: 400, message: "Error creando turno: " + e.message});
    }
}

exports.confirmarTurno = async function (req, res, next) {
    // ... (validación de ID) ...
    try {
        var confirmed = await TurnoService.confirmTurno(req.body.id);

        // --- AGREGAR ENVÍO DE EMAIL ---
        // 'confirmed' es el objeto turno actualizado que nos devuelve el servicio
        if (confirmed && confirmed.email) {
            await EmailService.enviarCorreo(
                confirmed.email,
                "¡Turno Confirmado! - Pérez Odontología",
                `Hola ${confirmed.paciente}, buenas noticias. Tu turno del ${confirmed.fecha} a las ${confirmed.hora} ha sido CONFIRMADO. ¡Te esperamos!`
            );
        }
        // -----------------------------

        return res.status(200).json({status: 200, data: confirmed, message: "Turno confirmado"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}