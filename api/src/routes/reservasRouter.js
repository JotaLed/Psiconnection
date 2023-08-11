const { Router } = require("express");
const {
  reservarCitaHandler,
  getAllCitasHandler,
  getAllAppointmentsHandler,
  putHandler,
} = require("../handlers/reservasHandler");

const reservasRouter = Router();

reservasRouter.post("/reservarCita", reservarCitaHandler);

reservasRouter.get("/reservarCita", getAllAppointmentsHandler);

reservasRouter.put("/reservarCita", putHandler);

module.exports = reservasRouter;
