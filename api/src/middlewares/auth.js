const { verifyToken } = require('../helpers/generateTokens.js');



const checkAuth = async (req, res, next) => {
    try {
        //TODO ---> authorization: Bearear 101010101010110101010
        const token = req.headers.authorization.split(' ').pop() //TODO: 1010101101010 separar el token
        
        const tokeData = await verifyToken(token)

        if(!tokeData.id) {
            res.status(409).json({error:"El TOKEN no se encuentra o es invalido"})
        } else {
           return next()
        }
         
    } catch (error) {
       console.log(error);
       res.status(409).json({error:"Error en token"})
       
    }
}

const verifyIdToken = async (req, res, next) => {
    const { id } = req.params;
console.log('token que llega',req.headers.authorization);
    
     try {
        
        const token = req.headers.authorization.split(' ').pop() //TODO: 1010101101010 separar el token
        const tokeData = await verifyToken(token)
        if(tokeData.id !== id){
            res.status(409).json({error:'Acceso no autorizado'})
        } else {
            next()
        }
    } catch (error) {
        console.log(error);
        res.status(409).json({error:"Error en token"})
    }

}


module.exports = {
    checkAuth, 
    verifyIdToken
};
