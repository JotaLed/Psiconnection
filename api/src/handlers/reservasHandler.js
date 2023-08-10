const {
  reservaCita,
  getAllAppointmentsController,
} = require("../controllers/reservaController");

const reservarCitaHandler = async (req, res) => {
  const { idPsico, idUser, fecha, hora } = req.body;
  try {
    const postReserva = await reservaCita({ idPsico, idUser, fecha, hora });
    res.status(200).json(postReserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllAppointmentsHandler = async (req, res) => {
  try {
    const appointments = await getAllAppointmentsController();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { reservarCitaHandler, getAllAppointmentsHandler };
