const { Router } = require("express");
const upload = require("../utils/upload");

//midlewares //TODO: AUTHENTICATOR
const checkAuth = require("../middlewares/auth.js");
const checkRollAuth = require("../middlewares/rollAuth.js");

// handlers
const {
  registerHandler,
  getDetailHandler,
  subirFoto,
  putHandler,
  deleteHandler,
  getPsicologosHandler,
} = require("../handlers/psicologosHandlers.js");

const psicologosRoutes = Router();

//Ruta que trae a todos los psicólogos, incluye búsqueda por query
psicologosRoutes.get("/", getPsicologosHandler);

//Ruta de búsqueda por id
//TODO: ejemplo de midleware auth y permisos por roll
// psicologosRoutes.get("/:id",checkAuth, checkRollAuth(['usuario']), getDetailHandler);
psicologosRoutes.get("/:id", getDetailHandler);

//Modificar información existente del psico
psicologosRoutes.put("/update", putHandler);

//Eliminar psico (cambia el estado)
psicologosRoutes.delete("/delete", deleteHandler);

//! registro
// ruta tipo post http://localhost:3001/psiconection/registerPsicologo --- Psicologo
psicologosRoutes.post("/registerPsicologo", registerHandler);

// ruta tipo put subir foto ruta http://localhost:3001/psiconection/uploadFoto/"id del psicologo"
psicologosRoutes.put("/uploadFoto/:id", upload.single("foto"), subirFoto);

module.exports = psicologosRoutes;
