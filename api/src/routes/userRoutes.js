const { Router } = require("express");
const {
  userCreateHandler,
  subirFotoUser,
  putHandler,
  deleteHandler,
} = require("../handlers/userHandlers.js");
const upload = require("../utils/upload.js");

const userRoutes = Router();

//ruta tipo post http://localhost:3001/psiconection/registerUsuario  --- Usuario
userRoutes.post("/registerUsuario", userCreateHandler);

//ruta update foto http://localhost:3001/psiconnection/uploadFoto/id
userRoutes.put("/uploadFotoUser/:id", upload.single("foto"), subirFotoUser);

//Modificar información existente del user
userRoutes.put("/updateuser", putHandler);

//Eliminar user (cambia el estado)
userRoutes.delete("/delete", deleteHandler);

module.exports = userRoutes;
