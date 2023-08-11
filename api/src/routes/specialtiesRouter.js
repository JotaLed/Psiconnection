const { Router } = require("express");
const getSpecialties = require("../controllers/specialtiesController");

const specialtiesRoutes = Router();

specialtiesRoutes.get("/", getSpecialties);

module.exports = specialtiesRoutes;
