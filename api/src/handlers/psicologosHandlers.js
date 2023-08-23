const {
  createUsuarioPsicologo,
  getDetailController,
  añadirValoracion,
  uploadFoto,
  getPsicologosController,
  getPsicologoByNameController,
  putController,
  deleteController,
  detailAcountPsicologo,
} = require("../controllers/psicologosController.js");

const cloudinary = require("../utils/cloudinary.js");

// helpers
const obtenerFechaActual = require("../helpers/getFecha.js");
const emailer = require("../helpers/emailers.js");

//Handler de la ruta get que trae a todos los psicologos
const getPsicologosHandler = async (req, res) => {
  const { apellido } = req.query;
  try {
    let psicologo;
    if (apellido) {
      psicologo = await getPsicologoByNameController(apellido);
    } else {
      psicologo = await getPsicologosController();
    }
    res.status(200).json(psicologo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDetailHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const detail = await getDetailController(id);
    res.status(200).json(detail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const agregarValoracion = async (req, res) => {
  const { rating } = req.body;
  const { id } = req.params;
  try {
    const updatePsico = await añadirValoracion({ id, rating });
    res.status(200).json(updatePsico);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// manejador de registro psicologo http://localhost:3001/psiconection/registerPsicologo --- Psicologo
const registerHandler = async (req, res, next) => {
  const {
    nombre,
    apellido,
    email,
    fecha_nacimiento,
    password,
    pais,
    zona_horaria,
    dias,
    horas,
    genero,
    tarifa,
    especialidad,
    whatsAppUrl,
    telefono,
    descripcion,
    foto,
    licencia,
  } = req.body;
  const fecha = obtenerFechaActual();
  // const fotoPerfilFile = req.files['fotoPerfil'][0];
  // const licenciaFile = req.files['licencia'][0];
  console.log(fecha);

  function getUrlImage(filePath) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(filePath, function (err, result) {
        if (err) {
          reject(new Error("No se pudo subir la imagen"));
        } else {
          const url = result.secure_url;
          resolve(url);
        }
      });
    });
  }

  //! funcion para pdf
  async function uploadPDF(filePath) {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: "raw", // Indicar que se trata de un archivo sin procesar
        // folder: 'pdfs' // Carpeta en Cloudinary donde se almacenará el PDF
      });

      const url = result.secure_url;
      return url;
    } catch (error) {
      throw new Error("No se pudo subir el archivo PDF a Cloudinary");
    }
  }

  // const fotoPerfilUrl = await getUrlImage(fotoPerfilFile.path);
  // const licenciaUrl = await getUrlImage(licenciaFile.path);

  try {
    //! validaciones
    if (!nombre) return res.status(403).json({ error: "nombre vacio" });
    if (!apellido) return res.status(403).json({ error: "apellido vacio" });
    if (!email) return res.status(403).json({ error: "email vacio" });
    if (!fecha_nacimiento) return res.status(403).json({ age: "nombre vacio" });
    if (!password) return res.status(403).json({ error: "password vacio" });
    if (!pais) return res.status(403).json({ error: "pais vacio" });
    if (!genero) return res.status(403).json({ error: "genero vacio" });
    //     if (!licenciaUrl) return res.status(403).json({ error: "licencia vacia" });
    if (!tarifa) return res.status(403).json({ error: "tipo de pago vacio" });
    if (!especialidad)
      return res.status(403).json({ error: "especialidad vacio" });
    //if (!whatsAppUrl) return res.status(403).json({ error: "WhatsApp vacio" });
    if (!telefono) return res.status(403).json({ error: "telefono vacio" });
    if (!descripcion)
      return res.status(403).json({ error: "descripcion vacio" });
    if (!zona_horaria)
      return res.status(403).json({ error: "zona horaria vacio" });
    if (!dias) return res.status(403).json({ error: "días vacio" });
    if (!horas) return res.status(403).json({ error: "horas vacio" });
    //     if (!fotoPerfilUrl) return res.status(403).json({ error: "foto vacio" });

    const usuarioPsicologo = await createUsuarioPsicologo({
      nombre,
      apellido,
      email,
      fecha_nacimiento,
      password,
      pais,
      zona_horaria,
      dias,
      horas,
      genero,
      tarifa,
      especialidad,
      whatsAppUrl,
      telefono,
      descripcion,
      fecha,
      foto,
      licencia,
      //       fotoPerfilUrl,
      //       licenciaUrl
    });
    if (usuarioPsicologo) {
      console.log("psicologo", usuarioPsicologo);

      await emailer.sendMailRegister(usuarioPsicologo);
      return res.status(200).json(usuarioPsicologo);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const subirFoto = async (req, res) => {
  function getUrlImage() {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(req.file.path, function (err, result) {
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
    const fotoURL = await getUrlImage();
    const updateFoto = await uploadFoto({ fotoURL, id });
    return res.status(200).json(updateFoto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Handler de la ruta put para corroborar que al menos llego un dato para actualizar
const putHandler = async (req, res, next) => {
  const data = req.body;

  if (!data || Object.keys(data).length === 0) {
    return res.status(400).send("No llegó ningún dato");
  }

  const uuidv4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!data.id) {
    return res
      .status(400)
      .send("Se requiere un 'id' en el cuerpo de la solicitud.");
  }

  if (!uuidv4Regex.test(data.id)) {
    return res
      .status(400)
      .send("El 'id' proporcionado no tiene el formato UUIDV4 válido.");
  }

  const validFields = [
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
    "estado_cuenta",
  ];

  const invalidFields = [];

  for (const field in data) {
    if (field === "id") {
      continue; // Saltar la validación para el campo "id"
    }
    if (!validFields.includes(field)) {
      invalidFields.push(field);
    } else {
      if (field === "email" && !isValidEmail(data[field])) {
        return res.status(400).send("El formato del email no es válido");
      }
      if (field === "genero" && !isValidGender(data[field])) {
        return res.status(400).send("El género proporcionado no es válido");
      }
      if (field === "especialidad") {
        if (!Array.isArray(data[field])) {
          return res.status(400).send("La especialidad no es un array válido");
        }
        for (const item of data[field]) {
          if (typeof item !== "string") {
            return res
              .status(400)
              .send(
                "Uno de los elementos en 'especialidad' no es un string válido"
              );
          }
        }
      }
    }
  }

  if (invalidFields.length > 0) {
    return res
      .status(400)
      .send(
        `Los siguientes campos no son válidos: ${invalidFields.join(", ")}`
      );
  }

  await putController(req, res);
};

// Función para validar formato de email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Función para validar género
function isValidGender(gender) {
  const validGenders = ["Masculino", "Femenino", "Otro", "Sin especificar"];
  return validGenders.includes(gender);
}

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

const getDetailAcount = async (req, res) => {
  const { id } = req.params;
  try {
    const psicologo = await detailAcountPsicologo(id);
    return res.status(200).json(psicologo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerHandler,
  getDetailHandler,
  agregarValoracion,
  subirFoto,
  putHandler,
  deleteHandler,
  getPsicologosHandler,
  getDetailAcount,
};
