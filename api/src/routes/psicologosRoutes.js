const { Router } = require("express");
const upload = require("../utils/upload");

//midlewares //TODO: AUTHENTICATOR
const { checkAuth, verifyIdToken } = require("../middlewares/auth.js");
const { checkRollAuth } = require("../middlewares/rollAuth.js");

//Controladores
const {
  putController,
  deleteController,
} = require("../controllers/psicologosController");

// handlers
const {
  registerHandler,
  getDetailHandler,
  agregarValoracion,
  subirFoto,
  putHandler,
  deleteHandler,
  getPsicologosHandler,
  getDetailAcount,
} = require("../handlers/psicologosHandlers.js");

const psicologosRoutes = Router();

//Ruta que trae a todos los psicólogos, incluye búsqueda por query
psicologosRoutes.get("/", getPsicologosHandler);

//Ruta de búsqueda por id
//TODO: ejemplo de midleware auth y permisos por roll
// psicologosRoutes.get("/:id",checkAuth, checkRollAuth(['usuario']), getDetailHandler);
psicologosRoutes.get("/:id", getDetailHandler);

//actualizar la valoracion del psico
psicologosRoutes.put("/:id", agregarValoracion);

//Modificar información existente del psico
psicologosRoutes.put("/update/psico", putHandler);

//Eliminar psico (cambia el estado)
psicologosRoutes.delete("/delete", deleteHandler);

//! registro
// ruta tipo post http://localhost:3001/psiconection/registerPsicologo --- Psicologo
psicologosRoutes.post(
  "/registerPsicologo",
  upload.fields([{ name: "fotoPerfil" }, { name: "licencia" }]),
  registerHandler
);

// ruta tipo put subir foto ruta http://localhost:3001/psiconection/uploadFoto/"id del psicologo"
psicologosRoutes.put("/uploadFoto/:id", upload.single("foto"), subirFoto);

// ruta tipo get obtener detalles de la cuenta ruta http://localhost:3001/psiconection/acount/"id del psicologo"
//! con autentificacion
psicologosRoutes.get("/acount/:id",verifyIdToken,checkRollAuth(["psicologo"]),getDetailAcount);

//! sin con autentificacion
// psicologosRoutes.get("/acount/:id", getDetailAcount);

module.exports = psicologosRoutes;
