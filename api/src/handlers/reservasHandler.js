const {
  reservaCita,
  getAllAppointmentsController,
  putController,
} = require("../controllers/reservaController");

// utils 
const mailer= require('../helpers/emailers.js')

const reservarCitaHandler = async (req, res) => {
  const { idPsico, idUser, estado, hora, fecha } = req.body;
  // const { hora, fecha } = req.query

  try {
    const postReserva = await reservaCita({ idPsico, idUser, estado, hora, fecha });

    // let dataValues = postReserva[0]
    // console.log('la reserva', dataValues);
    

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

const putHandler = async (req, res) => {
  const data = req.body;

  const requiredProperties = ["id", "estado"];
  const propertyTypes = {
    id: "string",
    estado: "string",
  };

  const missingProperties = [];
  const invalidTypeProperties = [];

  for (const property of requiredProperties) {
    if (!(property in data)) {
      missingProperties.push(property);
    } else if (typeof data[property] !== propertyTypes[property]) {
      invalidTypeProperties.push(property);
    }
  }

  if (missingProperties.length > 0) {
    return res
      .status(400)
      .send(
        `Faltan las siguientes propiedades: ${missingProperties.join(", ")}`
      );
  }

  if (invalidTypeProperties.length > 0) {
    return res
      .status(400)
      .send(
        `Las siguientes propiedades tienen tipos inválidos: ${invalidTypeProperties.join(
          ", "
        )}`
      );
  }

  await putController(req, res);
};

module.exports = {
  reservarCitaHandler,
  getAllAppointmentsHandler,
  putHandler,
};
