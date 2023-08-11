const { Psicologo, Usuario, Reserva } = require("../db");

const reservaCita = async ({ idPsico, idUser, fecha, hora, estado }) => {
  try {
    const psicologo = await Psicologo.findByPk(idPsico);
    const usuario = await Usuario.findByPk(idUser);

    const nuevaReserva = {
      fecha: fecha,
      hora: hora,
      estado: estado
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

const putController = async (req, res) => {
  try {
    const reservaId = req.body.id;
    const nuevoEstado = req.body.estado;

    const reserva = await Reserva.findByPk(reservaId);

    if (!reserva) {
      return res.status(404).send("La reserva no existe en la base de datos.");
    }

    reserva.estado = nuevoEstado;

    await reserva.save();

    res.status(200).send({
      message: "El estado de la reserva se actualizó correctamente.",
      reservaActualizada: reserva,
    });
  } catch (error) {
    console.error("Error al actualizar estado de la reserva:", error);
    res
      .status(500)
      .send(
        "Ocurrió un error al actualizar el estado de la reserva: " +
          error.message
      );
  }
};

module.exports = { reservaCita, putController, getAllAppointmentsController };
