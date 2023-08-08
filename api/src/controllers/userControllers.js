const { encrypt, compare } = require("../helpers/handleBcrypt.js");
const { Usuario } = require("../db.js");

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

// Controlador para actualizar datos de un user
const putController = async (req, res) => {
  try {
    const userId = req.body.id;

    const user = await Usuario.findByPk(userId);

    if (!user) {
      return res
        .status(404)
        .send("El psicólogo no existe en la base de datos.");
    }

    const dataToUpdate = req.body;

    for (const campo in dataToUpdate) {
      user[campo] = dataToUpdate[campo];
    }

    await user.save();

    res.status(200).send({
      message: "Los datos del usuario se actualizaron correctamente.",
      usuarioActualizado: user,
    });
  } catch (error) {
    console.error("Error al actualizar datos del usuario:", error);
    res
      .status(500)
      .send("Ocurrió un error al actualizar los datos del usuario.");
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

module.exports = {
  createUserController,
  uploadUserPhoto,
  putController,
  deleteController,
};
