const bcrypt = require('bcryptjs');
const { Psicologo, Usuario } = require('../db.js');

const { tokenSign, tokenSignUser } = require('../helpers/generateTokens.js');





const loginController = async ({email, contraseña}) => {
    const psicologo = await Psicologo.findOne({
        where: {
            email: email
        }
       });
    const usuario = await Usuario.findOne({
        where: {
            email: email
        }
    });
    
    
    //! Verificamos que sea usuario...
    if(usuario) {
        if(usuario.estado_cuenta.toLowerCase() === "activo"){
            const passwordCorrectUser = await bcrypt.compare(contraseña, usuario.contraseña);
            if(passwordCorrectUser){
                const tokenSessionUser = await tokenSignUser(usuario) 
                return {success: passwordCorrectUser, info: {
                roll: usuario.roll,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                tokenSessionUser
            }};
        } else {
            throw new Error('Email invalido o contraseña invalida, por favor intente de nuevo');
        }
        } else {
            throw new Error('Tu cuenta a sido baneada por un moderador, porfavor ponte en contacto con nosotro para mas informacion...')
        }
    }

    //! si no es usuario entonces pasamos a verificar que psicologo...
    if(!psicologo) throw new Error('Email invalido o contraseña invalida, por favor intente de nuevo');
    if(psicologo){
        if(psicologo.estado_cuenta.toLowerCase() === 'activo'){
            const passwordCorrect = await bcrypt.compare(contraseña, psicologo.contraseña);
            if(!passwordCorrect) throw new Error('Email invalido o contraseña invalida, por favor intente de nuevo')
            const tokenSession = await tokenSign(psicologo) 
            return {success: passwordCorrect, info: {
                roll: psicologo.roll,
                nombre: psicologo.nombre,
                apellido: psicologo.apellido,
                email: psicologo.email,
                tokenSession
        
            }};
        } else {
            throw new Error('Tu cuenta a sido baneada por un moderador, por favor ponte en contacto con nosotros para mas información...')
        }
    }
};

module.exports = {
    loginController
}