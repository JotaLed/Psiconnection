const nodemailer = require('nodemailer');


const { htmlTemplatePsicologo } = require('../utils/const.js')



//! Funcion principal de transport 

// var transport = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "9c6f14bd4dbec3",
//       pass: "fa0f9b8a58d411"
//     }
//   });


const createTrans = () => {
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "9c6f14bd4dbec3",
            pass: "fa0f9b8a58d411"
  }
    })

    return transport
}


const sendMailRegister = async (psicologo) => {
    const transporter = createTrans()
    const info = await transporter.sendMail({
        from: '"Alejandro Magno 🤴" <magno@exaple.com>',
        to: `${psicologo.email}`,
        subject: `Welcome ${psicologo.nombre} ${psicologo.apellido} to psiconnection 👨‍⚕️👩‍⚕️`,
        html: htmlTemplatePsicologo
        // html: `<b> Welcome ${psicologo.nombre} ${psicologo.apellido} to psiconnection 👨‍⚕️👩‍⚕️</b>`,
    });

    console.log("Message sent: %s", info.messageId);
    
    return 
}


exports.sendMailRegister = (psicologo) => sendMailRegister(psicologo)

