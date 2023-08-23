const { Router } = require("express");
const {
  userCreateHandler,
  subirFotoUser,
  putHandler,
  deleteHandler,
  getDetailAcount,
  getHandler,
  getDetailAcountAdmin,
} = require("../handlers/userHandlers.js");
const upload = require("../utils/upload.js");

const userRoutes = Router();

//midlewares //TODO: AUTHENTICATOR
const { checkAuth, verifyIdToken } = require("../middlewares/auth.js");
const { checkRollAuth, checkAdmin } = require("../middlewares/rollAuth.js");

//ruta tipo post http://localhost:3001/psiconection/registerUsuario  --- Usuario
userRoutes.post("/registerUsuario", userCreateHandler);

//ruta update foto http://localhost:3001/psiconnection/uploadFoto/id
userRoutes.put("/uploadFotoUser/:id", upload.single("foto"), subirFotoUser);

//Modificar información existente del user
userRoutes.put("/update/user", putHandler);

//Eliminar user (cambia el estado)
userRoutes.delete("/delete/user", deleteHandler);

// ruta tipo get sin auth http://localhost:3001/psiconection/usuario/acount/id
// userRoutes.get("/usuario/acount/:id", getDetailAcount);

userRoutes.get("/get/users", getHandler);

//! con autentificacion
userRoutes.get(
  "/usuario/acount/:id",
  verifyIdToken,
  checkRollAuth(["usuario"]),
  getDetailAcount
);

//! con autenticacion admin
userRoutes.get(
  "/usuario/acount/admin/:id",
  verifyIdToken,
  checkAdmin(["admin"]),
  getDetailAcountAdmin
);

// ruta tipo get obtener todas
userRoutes.get("/usuarios/all", (req, res) => {
  res.send("todos");
});

module.exports = userRoutes;
