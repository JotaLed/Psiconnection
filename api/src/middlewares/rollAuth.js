const { verifyToken } = require('../helpers/generateTokens.js');
const { Psicologo, Usuario } = require('../db.js');


const checkRollAuth = (roles) => async (req, res, next)  => { 
    try {
        
        
        const token = req.headers.authorization.split(' ').pop(); //TODO: 23232323
        const tokenData = await verifyToken(token);
        const psicologo = await Psicologo.findByPk(tokenData.id);
        const usuario = await Usuario.findByPk(tokenData.id);
        
        

        //TODO: [''].includes('psicologo')
        if(psicologo){
            if([].concat(roles).includes(psicologo.roll)){
                next()
            } else {
                res.status(409).json({Error:'No tienes permiso para esta funcionalidad'})
            }
        } 
        if(usuario){
            if([].concat(roles).includes(usuario.roll)){
                next()
            } else {
                res.status(409).json({Error:'No tienes permiso para esta funcionalidad'})
            }
        }
    } catch (error) {
        res.status(409).json({error:error.message})
    }
}



module.exports = checkRollAuth;