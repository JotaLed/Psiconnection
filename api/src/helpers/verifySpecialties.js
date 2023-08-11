const { Especialidad } = require("../db.js");

async function verifySpecialties() {
  try {
    const especialidades = [
      "Psicología de pareja",
      "Psicología infantil",
      "Psicología cognitivo-conductual",
      "Psicoanálisis",
      "Sexología",
    ];

    const existingEspecialidades = await Especialidad.findAll();

    const missingEspecialidades = especialidades.filter(
      (especialidad) =>
        !existingEspecialidades.some(
          (existing) => existing.especialidad === especialidad
        )
    );

    if (missingEspecialidades.length > 0) {
      const nuevasEspecialidades = missingEspecialidades.map(
        (especialidad) => ({
          especialidad,
        })
      );

      await Especialidad.bulkCreate(nuevasEspecialidades);

      // console.log("Especialidades creadas y guardadas:", missingEspecialidades);
    } else {
      // console.log("Todas las especialidades ya existen en la base de datos.");
    }
  } catch (error) {
    // console.error("Error al verificar y crear especialidades:", error);
  }
}

module.exports = verifySpecialties;
