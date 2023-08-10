const { Psicologo, Usuario, Reserva } = require("../db");

const reservaCita = async ({ idPsico, idUser, fecha, hora }) => {
  try {
    const psicologo = await Psicologo.findByPk(idPsico);
    const usuario = await Usuario.findByPk(idUser);

    const nuevaReserva = {
      fecha: fecha,
      hora: hora,
    };

    const newReserva = await psicologo.addUsuario(usuario, {
      through: nuevaReserva,
    });

    return newReserva;
  } catch (error) {
    console.log(error);

    throw new Error("Error al intentar reservar la cita");
  }
};

const getAllAppointmentsController = async () => {
  const appointments = await Reserva.findAll();
  return appointments;
};

module.exports = { reservaCita };
