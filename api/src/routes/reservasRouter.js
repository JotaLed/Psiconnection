const { Router } = require("express");
const {
  reservarCitaHandler,
  getAllCitasHandler,
  getAllAppointmentsHandler,
  putHandler,
  
} = require("../handlers/reservasHandler");
const {receiveWebhook} = require('../controllers/paymentController/paymentController')

const reservasRouter = Router();

reservasRouter.get("/reservarCita/crear", reservarCitaHandler);

reservasRouter.get("/reservarCita", getAllAppointmentsHandler);

reservasRouter.put("/reservarCita", putHandler);


module.exports = reservasRouter;
