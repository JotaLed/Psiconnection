const { Router } = require("express");
const {
  reservarCitaHandler,
  getAllAppointmentsHandler,
} = require("../handlers/reservasHandler");

const reservasRouter = Router();

reservasRouter.get("/reservarCita", reservarCitaHandler);

reservasRouter.get("/reservas", getAllAppointmentsHandler);
module.exports = reservasRouter;
