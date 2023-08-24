const { Psicologo, Usuario, Reserva } = require("../db");

const emailer = require("../helpers/emailers.js");

const reservaCita = async (newCita) => {

  console.log('newCitaaa', newCita);
    const cita = { 
    idPsico: newCita.idPsico, 
    idUser: newCita.idUser, 
    fecha: newCita.fecha, 
    hora: newCita.hora,
    estado: newCita.estado 
  }


  

  const psicologo = await Psicologo.findByPk(cita.idPsico);
  const usuario = await Usuario.findByPk(cita.idUser);
  try {

    if(psicologo && usuario){
  
      const newReserva = await Reserva.create({
        fecha: cita.fecha,
        hora: cita.hora,
        estado: cita.estado,
        PsicologoId: cita.idPsico,
        UsuarioId: cita.idUser
      })
     
      
      if (newReserva) {
        const data = newReserva
        console.log('data', data);
        
        // console.log('data', data);
        // console.log(newReserva[0].dataValues.fecha);
        // console.log(newReserva[0].dataValues.hora);
        // console.log(newReserva[0].dataValues.estado);
        await emailer.sendMailReserva({ newReserva: data, psicologo, usuario });
  
        return newReserva;
      }

    }

    // const nuevaReserva = {
    //   fecha: cita.fecha,
    //   hora: cita.hora,
    //   estado: cita.estado,
    // };

    // const newReserva = await psicologo.addUsuario(usuario, {
    //   through: nuevaReserva,
    // });
    
   
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
    const nuevaInformacion = req.body; // Incluir todos los campos en el body

    const reserva = await Reserva.findByPk(reservaId);

    if (!reserva) {
      return res.status(404).send("La reserva no existe en la base de datos.");
    }

    // Actualizar cada campo de la reserva con la nueva información
    for (const campo in nuevaInformacion) {
      reserva[campo] = nuevaInformacion[campo];
    }

    await reserva.save();

    res.status(200).send({
      message: "La reserva se actualizó correctamente.",
      reservaActualizada: reserva,
    });
  } catch (error) {
    console.error("Error al actualizar la reserva:", error);
    res
      .status(500)
      .send("Ocurrió un error al actualizar la reserva: " + error.message);
  }
};



//! controlador de pruebaaaaaaaaaa


const crearPruebaControlador = async (newCita) => {
  
  // Obtener los objetos del psicólogo y el usuario
  const psicologo = await Psicologo.findByPk(newCita.idPsico);
  const usuario = await Usuario.findByPk(newCita.idUser);



  const cita = {
    fecha: newCita.fecha,
    hora: newCita.hora,
    idPsicologo: newCita.idPsico,
    idUsuario: newCita.idUser,
    estado: newCita.estado
  }

  console.log('la citaa', cita);
  


  // Crear una nueva instancia de Reserva

  const nuevaReserva = await Reserva.create({
    fecha: cita.fecha,
    hora: cita.hora,
    estado: cita.estado,
    PsicologoId: cita.idPsicologo,
    UsuarioId: cita.idUsuario
  });

 

  // Establecer la relación entre el psicólogo, el usuario y la reserva
// await nuevaReserva.addPsicologo(psicologo);
// await nuevaReserva.addUsuario(usuario);
 

  return nuevaReserva

}

module.exports = { reservaCita, putController, getAllAppointmentsController, crearPruebaControlador};
