const jwt = require('jsonwebtoken');


//! Genera el token
const tokenSign = async (user) => {
    
    
    return jwt.sign(
        {
            id: user.id,
            roll: user.roll,
            nombre: user.nombre,
            apellido: user.apellido
        }, //TODO: PAYLOAD ---> Carga util del token
        process.env.PALABRA_SECRETA, //TODO env ---> frase secreta(llave secreta)
    )
}

const tokenSignUser = async (usuario) => {
    return jwt.sign(
        {
            id: usuario.id,
            roll: usuario.roll,
            nombre: usuario.nombre,
            apellido: usuario.apellido
        }, //TODO: PAYLOAD ---> Carga util del token
        process.env.PALABRA_SECRETA, //TODO env ---> frase secreta(llave secreta)
    )
} 


const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.PALABRA_SECRETA)
    } catch (error) {
        return null
    }
}

//! Verificar que el token sea valido y correcto
const decodeSign = () => {

}


module.exports = {
    tokenSign,
    verifyToken,
    decodeSign,
    tokenSignUser
}