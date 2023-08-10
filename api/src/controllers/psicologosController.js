require("dotenv").config();
const { encrypt, compare } = require("../helpers/handleBcrypt.js");
const { Psicologo, Reserva, Usuario } = require("../db.js");
const { Op } = require("sequelize");

//Búsqueda de todos los psicólogos
const getPsicologosController = async () => {
  const psicologos = await Psicologo.findAll();
  return psicologos;
};

// const getPsicologoByNameController = async (apellido) => {
//   const psicologoName = apellido.toLowerCase();
//   const dbResults = await Psicologo.findAll({
//     where: {
//       apellido: {
//         [Op.iLike]: `%${psicologoName}%`,
//       },
//     },
//   });
//   return dbResults;
// };

const getPsicologoByNameController = async (nombreOApellido) => {
 
    const psicologos = await Psicologo.findAll({
      where: {
        [Op.or]: [
          { nombre: { [Op.iLike]: `%${nombreOApellido}%` } }, // Búsqueda por nombre (ignorando mayúsculas y minúsculas)
          { apellido: { [Op.iLike]: `%${nombreOApellido}%` } } // Búsqueda por apellido (ignorando mayúsculas y minúsculas)
        ]
      }
    });
    if(!psicologos.length) throw new Error('Error al buscar psicólogos por nombre o apellido');

    return psicologos

}

//Controlador para búsqueda por id
const getDetailController = async (id) => {
  const detail = await Psicologo.findByPk(id);
  if (!detail) {
    throw new Error("No se encontro psicologo con ese id");
  }
  return detail;
};

// controlador de registro para crear psicologo http://localhost:3001/psiconection/registerPsicologo --- Psicologo

const createUsuarioPsicologo = async ({
  nombre,
  apellido,
  email,
  fecha_nacimiento,
  contraseña,
  pais,
  zona_horaria,
  horario,
  genero,
  licencia,
  tarifa,
  especialidad,
  whatsAppUrl,
  telefono,
  descripcion,
  fecha,
}) => {
  const passwordHash = await encrypt(contraseña);

  // ! verificamos que el usuario no se encuentre por el mismo email
  const verifyExistEmail = await Psicologo.findAll({
    where: {
      email: email,
    },
  });
  if (verifyExistEmail.length)
    throw new Error("El email ya se encuentra activo");

  //! verficcamos que no se repita el mismo nombre
  const verifyNombreApellido = await Psicologo.findAll({
    where: {
      nombre,
      apellido,
    },
  });
  if (verifyNombreApellido.length)
    throw new Error("Ya existe una persona con este mismo nombre");

  //! verificamos que no se repita la misma licencia
  const verifyLicencia = await Psicologo.findAll({
    where: {
      licencia,
    },
  });
  if (verifyLicencia.length)
    throw new Error("Ya existe un usuario con esta misma licencia");

  //! si el email al registrarse no esta en la base de datos, entonces procede a crearse el nuevo psicologo
  const newPsicologoCreate = await Psicologo.create({
    nombre,
    apellido,
    email,
    fecha_nacimiento,
    contraseña: passwordHash,
    pais,
    zona_horaria,
    horario,
    genero,
    licencia,
    tarifa,
    especialidad: [especialidad],
    whatsapp_url: whatsAppUrl,
    telefono,
    descripcion,
    fecha_registro: fecha,
  });

  return newPsicologoCreate;
};

//controlador asociacion de URL de foto a psicologo
const uploadFoto = async ({ fotoURL, id }) => {
  const updateFotoPsico = await Psicologo.update(
    { foto: fotoURL },
    {
      where: {
        id: id,
      },
    }
  );

  return updateFotoPsico;
};

// Controlador para actualizar datos de un psicólogo
const putController = async (req, res) => {
  try {
    const psicologoId = req.body.id;

    const psicologo = await Psicologo.findByPk(psicologoId);

    if (!psicologo) {
      return res
        .status(404)
        .send("El psicólogo no existe en la base de datos.");
    }

    const dataToUpdate = req.body;

    const allowedFields = [
      "email",
      "contraseña",
      "pais",
      "zona_horaria",
      "genero",
      "tarifa",
      "horario",
      "especialidad",
      "whatsapp_url",
      "telefono",
      "foto",
      "descripcion",
    ];

    const notAllowedFields = [];

    for (const campo in dataToUpdate) {
      if (campo !== "id" && !allowedFields.includes(campo)) {
        notAllowedFields.push(campo);
      } else {
        psicologo[campo] = dataToUpdate[campo];
      }
    }

    if (notAllowedFields.length > 0) {
      return res
        .status(400)
        .send(
          `Los siguientes campos no están permitidos para actualización: ${notAllowedFields.join(
            ", "
          )}`
        );
    }

    await psicologo.save();

    res.status(200).send({
      message: "Los datos del psicólogo se actualizaron correctamente.",
      psicologoActualizado: psicologo,
    });
  } catch (error) {
    console.error("Error al actualizar datos del psicólogo:", error);
    res
      .status(500)
      .send(
        "Ocurrió un error al actualizar los datos del psicólogo: " +
          error.message
      );
  }
};

// Controlador cambiar el estado "estado_cuenta" a Inactivo
const deleteController = async (req, res) => {
  const { id } = req.body;

  try {
    const psicologo = await Psicologo.findByPk(id);
    if (!psicologo) {
      return res
        .status(404)
        .send("El psicólogo con el id proporcionado no fue encontrado.");
    }

    // Cambiar el estado_cuenta a "Inactivo"
    await psicologo.update({ estado_cuenta: "Inactivo" });

    // Devolver el psicólogo actualizado
    return res.status(200).json(psicologo);
  } catch (error) {
    return res
      .status(500)
      .send("Ocurrió un error al marcar al psicólogo como 'Inactivo'.");
  }
};

const detailAcountPsicologo = async (id) => {

  const psicologo = await Psicologo.findByPk(id);

  const citas = await Reserva.findAll({
    where: {
      PsicologoId: id
    }
  })

 const usuariosMap = citas.map(async (cita) => {
    const usuario = await Usuario.findByPk(cita.UsuarioId);
    return usuario;
  });
 
  const usuarios = await Promise.all(usuariosMap);


  const usuarioCita = citas.map((cita) => {
    const usuario = usuarios.find((usuario) => usuario.id === cita.UsuarioId);
    return {
      IdCita: cita.id,
      Fecha: cita.fecha,
      Hora: cita.hora,
      usuarioId: usuario.id,
      usuarioNombre: usuario.nombre,
      usuarioApellido: usuario.apellido,
      usuarioPais: usuario.pais
    };
  });

  console.log(usuarioCita);
  
  const piscologoCita = {
    psicologo: psicologo,
    cita: usuarioCita
  }
  return  piscologoCita ;
};

module.exports = {
  createUsuarioPsicologo,
  getDetailController,
  uploadFoto,
  putController,
  deleteController,
  getPsicologoByNameController,
  getPsicologosController,
  detailAcountPsicologo,
};
