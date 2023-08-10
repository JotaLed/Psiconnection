const { Router } = require("express");
const {
  reservarCitaHandler,
  getAllCitasHandler,
  getAllAppointmentsHandler,
} = require("../handlers/reservasHandler");

const reservasRouter = Router();

reservasRouter.post("/reservarCita", reservarCitaHandler);

reservasRouter.get("/reservarCita", getAllAppointmentsHandler);

module.exports = reservasRouter;
