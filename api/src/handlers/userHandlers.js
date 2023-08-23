const {
  createUserController,
  uploadUserPhoto,
  putController,
  deleteController,
  detailAcountUsuario,
  getUserController,
} = require("../controllers/userControllers.js");

// helpers, midlwares  y utils
const obtenerFechaActual = require("../helpers/getFecha.js");
const cloudinary = require("../utils/cloudinary.js");
const emailer = require("../helpers/emailers.js");

const userCreateHandler = async (req, res) => {
  const {
    nombre,
    apellido,
    fecha_nacimiento,
    pais,
    genero,
    email,
    contraseña,
    telefono,
    roll,
    foto,
  } = req.body;
  console.log(contraseña);
  const fecha = await obtenerFechaActual();

  try {
    //! validaciones
    if (!nombre) return res.status(403).json({ error: "Nombre vacio." });
    if (!apellido) return res.status(403).json({ error: "Apellido vacio." });
    if (!contraseña)
      return res.status(403).json({ error: "Contraseña vacia." });
    if (!fecha_nacimiento)
      return res.status(403).json({ error: "Edad vacio." });
    if (!pais) return res.status(403).json({ error: "Pais vacio." });
    if (!genero) return res.status(403).json({ error: "Genero vacio." });
    if (!telefono) return res.status(403).json({ error: "Telefono vacio." });

    const newUser = await createUserController({
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
    });

    if (newUser) {
      await emailer.sendMailRegister(newUser);
      return res.status(200).json(newUser);
    }
  } catch (error) {
    console.log(error);

    return res.status(400).json({ error: error.message });
  }
};

const subirFotoUser = async (req, res) => {
  function getUrlUserImage() {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(req.file, function (err, result) {
        if (err) {
          reject(new Error("No se pudo subir la imagen"));
        } else {
          const data = result.url;
          resolve(data);
        }
      });
    });
  }
  try {
    const { id } = req.params;
    const fotoUserURL = await getUrlUserImage();
    console.log(fotoUserURL);
    const updatedUserPhoto = await uploadUserPhoto({ id, fotoUserURL });
    res.status(200).json(updatedUserPhoto);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getHandler = async (req, res) => {
  try {
    const users = await getUserController();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Handler de la ruta put para corroborar que al menos llego un dato para actualizar
const putHandler = async (req, res, next) => {
  const data = req.body;

  if (!data || Object.keys(data).length === 0) {
    return res.status(400).send("No llegó ningún dato");
  } else {
    await putController(req, res);
  }
};

//Handler de la ruta delete para verificar si llego por body id de tipo UUIDV4
const deleteHandler = async (req, res, next) => {
  const { id } = req.body;

  const uuidv4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!id) {
    return res
      .status(400)
      .send("Se requiere un 'id' en el cuerpo de la solicitud.");
  }
  if (!uuidv4Regex.test(id)) {
    return res
      .status(400)
      .send("El 'id' proporcionado no tiene el formato UUIDV4 válido.");
  }
  await deleteController(req, res);
};

const getDetailAcountAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await detailAcountUsuario(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getDetailAcount = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await detailAcountUsuario(id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  userCreateHandler,
  subirFotoUser,
  putHandler,
  deleteHandler,
  getDetailAcount,
  getHandler,
  getDetailAcountAdmin,
};
