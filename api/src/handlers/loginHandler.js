const { loginController } = require('../controllers/loginController.js')

const loginHandler = async (req, res) => {
    const { email, contraseña} = req.body
    try {

    //! Validaciones... 
        if(!email) return res.status(403).json({error: "Se require el email..."});
        if(!contraseña) return res.status(403).json({error:"Se require contraseña"});

    const responseLogin = await loginController({email, contraseña})  
        return res.status(200).json(responseLogin)
    } catch (error) {
        return res.status(401).json({error:error.message})
    }

}



module.exports = {
    loginHandler
}