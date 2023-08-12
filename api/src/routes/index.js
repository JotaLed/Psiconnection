const { Router } = require("express");

// router importados
const psicologosRoutes = require("./psicologosRoutes.js");
const userRoutes = require("./userRoutes.js");
const loginRouter = require("./loginRouter.js");
const reservasRouter = require("./reservasRouter.js");
const specialtiesRoutes = require("./specialtiesRouter.js");

const router = Router();

// Configuarion de routers
router.use("/psiconection/specialties", specialtiesRoutes);
router.use("/psiconection", psicologosRoutes);
router.use("/psiconection", userRoutes);
router.use("/psiconection/citas", reservasRouter);
router.use("/psiconection", loginRouter);

router.use("/", (req, res) => {
  res.status(200).send("/");
});

module.exports = router;
