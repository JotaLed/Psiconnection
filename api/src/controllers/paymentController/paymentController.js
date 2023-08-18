require("dotenv").config();
const { PAGO_BACK_URL_BASE } = process.env;
const mercadopago = require("mercadopago");

const { reservaCita } = require("../reservaController.js");
mercadopago.configure({
  access_token:
    "TEST-7687364498416789-081721-f8663e679c1457ff2508c27f8addd9db-1445431858",
});
let citaObj = {};

const createOrder = async (req, res) => {
  const { hora, fecha, idPsico, idUser, estado, tarifa } = req.body;

  const obj = {
    hora: hora,
    fecha: fecha,
    psicologo: idPsico,
    usuario: idUser,
    estado: estado,
    tarifa: tarifa,
  };
  citaObj = obj;
  console.log("objjjjj", obj);
  console.log("este es el obj adentro", citaObj);
  const objString = JSON.stringify(obj);
  const encodedObj = Buffer.from(objString).toString("base64");

  try {
    const result = await mercadopago.preferences.create({
      items: [
        {
          title: "Cita con Psicologo",
          unit_price: Number(tarifa),
          description: `La cita recerva tiene como fecha ${fecha}, en horario ${hora}`,
          currency_id: "USD",
          quantity: 1,
        },
      ],
      back_urls: {
        // success: `http://localhost:5173/success?data=${encodedObj}`,
        success: `${PAGO_BACK_URL_BASE}/success?data=${encodedObj}`,
        // failure: `http://localhost:5173/home`,
        failure: `${PAGO_BACK_URL_BASE}/home`,
        pending: "",
      },
      auto_return: "approved",
      notification_url:
        "https://ae59-190-120-253-194.ngrok.io/psiconnection/payment/webhook",
    });
    return res.status(200).json(result);
  } catch (error) {
    console.log("error", error);

    res.status(500).json({ error: error.message });
  }
};

const receiveWebhook = async (req, res) => {
  const payment = req.query;
  // console.log('este es el array afuera',citaObj);
  const cita = citaObj;
  // const { obj } = req.query;
  console.log("paso por aqui");
  console.log("la citaaa", cita);

  // const decodedObj = JSON.parse(Buffer.from(obj, 'base64').toString('utf-8'));
  // console.log('dataDescifrada', decodedObj);
  console.log("el queryyy", req.query);
  const newCita = {
    hora: cita.hora,
    fecha: cita.fecha,
    idPsico: cita.psicologo,
    idUser: cita.usuario,
    estado: cita.estado,
    tarifa: cita.tarifa,
  };

  console.log("la nueva cita", newCita);

  try {
    console.log("entro al try");
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      const status = data.body.status;
      console.log("status", status);
      if (status === "approved") {
        const agendarCita = await reservaCita(newCita);
        citaObj = {};
        return res.status(200).json(agendarCita);
      }
    }
    // else {
    //     console.log('llego al error');
    //     return res.status(400).json({error:"pago no procesado"})
    // }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  receiveWebhook,
};
