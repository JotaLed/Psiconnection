const { Especialidad } = require("../db");

const getSpecialties = async (req, res) => {
  try {
    const especialidades = await Especialidad.findAll();
    res.status(200).json(especialidades);
  } catch (error) {
    console.error("Error al obtener las especialidades:", error);
    res.status(500).send("Ocurrió un error al obtener las especialidades.");
  }
};

module.exports = getSpecialties;
