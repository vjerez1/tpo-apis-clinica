var nodemailer = require('nodemailer');

// Configuración del transporte (El "Cartero")
// OJO: Para que funcione con Gmail, necesitas activar "Contraseñas de Aplicación" en tu cuenta Google
// O usar Ethereal (fake SMTP) para pruebas
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // <--- PON TU EMAIL AQUÍ
        pass: process.env.GMAIL_PASS // <--- PON TU APP PASSWORD AQUÍ (No tu clave normal)
    }
});

exports.enviarCorreo = async function (destinatario, asunto, cuerpo) {
    const mailOptions = {
        from: `Consultorio Pérez <${process.env.GMAIL_USER}>`,
        to: destinatario,
        subject: asunto,
        text: cuerpo, // Versión texto plano
        html: `<div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h2>${asunto}</h2>
                <p>${cuerpo}</p>
                <br>
                <p>Saludos,<br>El equipo de Pérez Odontología</p>
               </div>`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("📧 ¡Correo enviado con éxito!: " + info.response);
        return info;
    } catch (error) {
        console.error("❌ Error enviando correo:", error);
    }
};