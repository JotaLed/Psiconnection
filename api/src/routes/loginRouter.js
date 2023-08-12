const { Router } = require('express');
const { loginHandler } = require('../handlers/loginHandler.js')

const loginRouter = Router();




//! login
//ruta tipo post http://localhost:3001/psiconection/login
loginRouter.post("/login", loginHandler);




module.exports = loginRouter;