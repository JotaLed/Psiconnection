const { Router } = require('express');
const { userCreateHandler, subirFotoUser } = require('../handlers/userHandlers.js');
const upload = require('../utils/upload.js');

const userRoutes = Router();
    
//ruta tipo post http://localhost:3001/psiconection/registerUsuario  --- Usuario
userRoutes.post('/registerUsuario', userCreateHandler);

//ruta update foto http://localhost:3001/psiconnection/uploadFoto/id 
userRoutes.put('/uploadFotoUser/:id', upload.single('foto'), subirFotoUser); 


module.exports = userRoutes;
