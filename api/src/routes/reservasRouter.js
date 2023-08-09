const { Router } = require('express');
const {reservarCitaHandler} = require('../handlers/reservasHandler')

const reservasRouter = Router();

reservasRouter.get("/reservarCita", reservarCitaHandler);

module.exports = reservasRouter;