const { Router } = require("express");
const {
  reservarCitaHandler,
  getAllCitasHandler,
  getAllAppointmentsHandler,
  putHandler,
  pruebaManejador
  
} = require("../handlers/reservasHandler");
const {receiveWebhook} = require('../controllers/paymentController/paymentController')

const reservasRouter = Router();

reservasRouter.post("/reservarCita/crear", reservarCitaHandler);

reservasRouter.get("/reservarCita", getAllAppointmentsHandler);

reservasRouter.put("/reservarCita", putHandler);

reservasRouter.post("/reservarCita/crearPrueba", pruebaManejador)


module.exports = reservasRouter;
