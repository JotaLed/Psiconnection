const { config } = require("dotenv");
config();

// Paypal
const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT;
const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET;
const PAYPAL_API = process.env.PAYPAL_API; // url sandbox or live for your app


// Server
const PORT = process.env.PORT;
const HOST =
  process.env.NODE_ENV === "production"
    ? process.env.HOST
    : process.env.BASE_URL_SERVER;


const URL_BASE_FRONT = process.env.URL_BASE_FRONT

module.exports = {
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET,
  PAYPAL_API,
  PORT,
  HOST,
  URL_BASE_FRONT
};
