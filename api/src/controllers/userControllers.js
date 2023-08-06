const { encrypt, compare } = require('../helpers/handleBcrypt.js');
const { Usuario } = require('../db.js');

// controlador de registro usuario http://localhost:3001/psiconection/registerUsuario --- Usuario
const createUserController = async ({nombre, apellido, fecha_nacimiento, pais, genero, email, contraseña, telefono, fecha}) => {

    const passwordHash = await encrypt(contraseña);

    //! verificamos que no haya usuario con email repetido 
    const verifyExistEMail = await Usuario.findAll({
        where: {
            email: email
        }
    });
    if(verifyExistEMail.length) throw new Error('El usuario con este email ya existe');
    
    //! verificamos que no haya usuario con nombre y apellido repetidos
    const verifyNombreApellido = await Usuario.findAll({
        where: {
            nombre: nombre,
            apellido: apellido
        }
    });
    if(verifyNombreApellido.length)  throw new Error('Ya existe un usuario con ese nombre');

    const newUser = await Usuario.create({
        nombre, 
        apellido,
        fecha_nacimiento, 
        pais, 
        genero, 
        email, 
        contraseña: passwordHash, 
        telefono,
        fecha_registro: fecha
    })
    return newUser 
};


const uploadUserPhoto = async ({id, fotoUserURL}) => {
    const updateFoto = await Usuario.update({ foto: fotoUserURL }, {
        where: {
            id: id
        }
    })

    return updateFoto;
}


module.exports = {
    createUserController,
    uploadUserPhoto
}