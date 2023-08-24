const { encrypt, compare } = require("../helpers/handleBcrypt.js");
const { Usuario, Reserva, Psicologo } = require("../db.js");

// controlador de registro usuario http://localhost:3001/psiconection/registerUsuario --- Usuario
const createUserController = async ({
  nombre,
  apellido,
  fecha_nacimiento,
  pais,
  genero,
  email,
  contraseña,
  telefono,
  fecha,
  roll,
  foto,
}) => {
  const passwordHash = await encrypt(contraseña);

  //! verificamos que no haya usuario con email repetido
  const verifyExistEMail = await Usuario.findAll({
    where: {
      email: email,
    },
  });
  if (verifyExistEMail.length)
    throw new Error("El usuario con este email ya existe");

  //! verificamos que no haya usuario con nombre y apellido repetidos
  const verifyNombreApellido = await Usuario.findAll({
    where: {
      nombre: nombre,
      apellido: apellido,
    },
  });
  if (verifyNombreApellido.length)
    throw new Error("Ya existe un usuario con ese nombre");

  const newUser = await Usuario.create({
    nombre,
    apellido,
    fecha_nacimiento,
    pais,
    genero,
    email,
    contraseña: passwordHash,
    telefono,
    fecha_registro: fecha,
    roll,
    foto,
  });
  return newUser;
};

const uploadUserPhoto = async ({ id, fotoUserURL }) => {
  const updateFoto = await Usuario.update(
    { foto: fotoUserURL },
    {
      where: {
        id: id,
      },
    }
  );

  return updateFoto;
};

const getUserController = async () => {
  const users = await Usuario.findAll();
  return users;
};

// Controlador para actualizar datos de un user
const putController = async (req, res) => {
  try {
    const usuarioId = req.body.id;
    console.log(req.body.id);

    const usuario = await Usuario.findByPk(usuarioId);

    if (!usuario) {
      return res.status(404).send("El usuario no existe en la base de datos.");
    }

    const dataToUpdate = req.body;

    // Propiedades permitidas para actualización
    const allowedProperties = [
      "nombre",
      "apellido",
      "fecha_nacimiento",
      "pais",
      "genero",
      "email",
      "contraseña",
      "telefono",
      "foto",
      "fecha_registro",
      "estado_cuenta",
      "roll",
      "estado_cuenta",
    ];

    const notAllowedProperties = ["fecha_registro", "roll"];

    for (const property in dataToUpdate) {
      if (allowedProperties.includes(property)) {
        if (notAllowedProperties.includes(property)) {
          return res
            .status(400)
            .send(`La propiedad '${property}' no puede ser modificada.`);
        }
        usuario[property] = dataToUpdate[property];
      }
    }

    await usuario.save();

    res.status(200).send({
      message: "Los datos del usuario se actualizaron correctamente.",
      usuarioActualizado: usuario,
    });
  } catch (error) {
    console.error("Error al actualizar datos del usuario:", error);
    res
      .status(500)
      .send(
        "Ocurrió un error al actualizar los datos del usuario: " + error.message
      );
  }
};

// Controlador cambiar el estado "estado_cuenta" a Inactivo de un user
const deleteController = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await Usuario.findByPk(id);
    if (!user) {
      return res
        .status(404)
        .send("El usuario con el id proporcionado no fue encontrado.");
    }

    // Cambiar el estado_cuenta a "Inactivo"
    await user.update({ estado_cuenta: "Inactivo" });

    // Devolver el usuario actualizado
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .send("Ocurrió un error al marcar al usuario como 'Inactivo'.");
  }
};

const detailAcountUsuario = async (id) => {
  const usuario = await Usuario.findByPk(id);

  const citas = await Reserva.findAll({
    where: {
      UsuarioId: id,
    },
  });

  const psicologosMap = citas.map(async (cita) => {
    const psicologo = await Psicologo.findByPk(cita.PsicologoId);
    return psicologo;
  });
  const psicologos = await Promise.all(psicologosMap);
  console.log(psicologos);

  const psicologoCita = citas.map((cita) => {
    const psicologo = psicologos.find(
      (psicologo) => psicologo.id === cita.PsicologoId
    );
    return {
      IdCita: cita.id,
      Fecha: cita.fecha,
      Hora: cita.hora,
      Estado: cita.estado,
      psicologoId: psicologo.id,
      psicologoNombre: psicologo.nombre,
      psicologoApellido: psicologo.apellido,
      psicologoPais: psicologo.pais,
    };
  });

  const info = {
    usuario: usuario,
    citas: psicologoCita,
  };

  return info;
};

module.exports = {
  createUserController,
  uploadUserPhoto,
  putController,
  deleteController,
  detailAcountUsuario,
  getUserController,
};
