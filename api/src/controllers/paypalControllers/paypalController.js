const axios = require("axios");
const request = require("request");
require("dotenv").config();
const { reservaCita } = require("../reservaController.js");
const {
  PAYPAL_API,
  HOST,
  BASE_URL_SERVER,
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET,
  URL_BASE_FRONT,
  URL_BASE_FRONT_DEPLOY,
  URL_BASE_BACK_DEPLOY,
} = require("../../config.js");

const cita = {};

const createOrder = async (req, res) => {
  const { hora, fecha, idPsico, idUser, estado, tarifa } = req.body;

  const obj = {
    hora,
    fecha,
    idPsico,
    idUser,
    estado,
    tarifa,
  };
  const porcentaje = Number(tarifa) * 0.05;
  console.log("porcentaje", porcentaje);

  const totalPago = Number(tarifa) - porcentaje;
  console.log("pago total", totalPago);

  // console.log('el objeto', obj);
  const objString = JSON.stringify(obj);
  const encodedObj = Buffer.from(objString).toString("base64");

  try {
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalPago,
          },
          payee: {
            email_address: "sb-jsci927131994@personal.example.com",
          },
        },
        // {
        //   amount: {
        //     currency_code: "USD",
        //     value: porcentaje, // Convierte el monto a enviar a una cadena con dos decimales
        //   },
        //   payee: {
        //     email_address: "sb-jsci927131994@personal.example.com",
        //   },
        // },
      ],
      application_context: {
        brand_name: "Psiconnection.com",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        // return_url: `${HOST}/pay/paymentCapture?data=${encodedObj}`,
        // cancel_url: `${HOST}/pay/paymentCancel`,
        return_url: `${URL_BASE_BACK_DEPLOY}/pay/paymentCapture?data=${encodedObj}`,
        cancel_url: `${URL_BASE_FRONT_DEPLOY}/payment/state/failure`,
      },
    };

    // format the body
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    // Generate an access token
    const {
      data: { access_token },
    } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: PAYPAL_API_CLIENT,
        password: PAYPAL_API_SECRET,
      },
    });

    console.log(access_token);

    // //! codigo funcional
    // make a request
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    // console.log(response.data);
    return res.json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something goes wrong");
  }
};

const captureOrder = async (req, res) => {
  const { token } = req.query;
  const { data } = req.query;
  const decodedObj = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));

  const newCita = {
    hora: decodedObj.hora,
    fecha: decodedObj.fecha,
    idPsico: decodedObj.idPsico,
    idUser: decodedObj.idUser,
    estado: decodedObj.estado,
    tarifa: decodedObj.tarifa,
  };

  console.log("la citaaa", newCita);
  try {
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
      {},
      {
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET,
        },
      }
    );
    const status = response.data.status;

    if (status === "COMPLETED") {
      const response = await reservaCita(newCita);
      console.log(response);
      // return res.redirect(`${URL_BASE_FRONT}/success?data=${data}`);
      return res.redirect(`${URL_BASE_FRONT_DEPLOY}/success?data=${data}`);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Ups algo salio mal...");
  }
};

const cancelOrder = (req, res) => {
  res.send("orden cancelada");
};

module.exports = {
  createOrder,
  captureOrder,
  cancelOrder,
};
