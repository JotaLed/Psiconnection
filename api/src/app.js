const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index.js");
const { auth } = require("express-openid-connect");
require("dotenv").config();

//auth0 config
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASEURL,
  clientID: process.env.AUTH0_CLIENTID,
  issuerBaseURL: process.env.AUTH0_ISSUERBASEURL,
};

const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));

// server.use((req, res, next) => {
//   const allowedOrigins = [
//     "http://localhost:3001",
//     "http://localhost:5173",
//     "https://psiconnectiondev.vercel.app",
//     "https://jwt.io/"
//     // Agrega más orígenes si es necesario
//   ];

//   const origin = req.headers.origin;

//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }

//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });


//! usando cors 
server.use(cors({
  origin: [
    "http://localhost:3001",
    "http://localhost:5173",
    "https://psiconnectiondev.vercel.app",
    "https://psiconnection-production.up.railway.app/"

    // Agrega más orígenes si es necesario
  ],
  credentials: true
}));

// auth router attaches /login, /logout, and /callback routes to the baseURL
server.use(auth(config));
// server.post("/callback", (req, res) => {
//   res.redirect("http://localhost:3001/psiconection");
// });

server.use("/", routes);

// Middleware de error general
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
