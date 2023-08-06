const server = require("./src/app.js");
require("dotenv").config();
const { PORT } = process.env;

const { conn } = require("./src/db.js");

conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log("listening at port ", PORT);
  });
});
//
