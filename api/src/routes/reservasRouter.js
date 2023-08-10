const { Router } = require('express');
const {reservarCitaHandler, getAllCitasHandler} = require('../handlers/reservasHandler')

const reservasRouter = Router();

reservasRouter.post("/reservarCita", reservarCitaHandler);



module.exports = reservasRouter; 