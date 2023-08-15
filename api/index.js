const server = require("./src/app.js");
require("dotenv").config();
const { PORT } = process.env;
const verifySpecialties = require("./src/helpers/verifySpecialties.js");
const { conn } = require("./src/db.js");
const changePendingAppointments = require("./src/helpers/nodeCron.js");

conn.sync({ force: false }).then(async () => {
  server.listen(PORT, () => {
    console.log("listening at port ", PORT);
  });

  await verifySpecialties();

  changePendingAppointments.start();
});
//
