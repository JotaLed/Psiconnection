require("dotenv").config();
const mercadopago = require('mercadopago')

const { reservaCita } = require('../reservaController.js')

const createOrder = async (req, res) => {
    const { hora, fecha, idPsico, idUser, estado, tarifa } = req.body
    const obj = {
        hora,
        fecha,
        idPsico,
        idUser,
        estado,
        tarifa
      }

      console.log("objjjjj", obj);
      

      const objString = JSON.stringify(obj);
      const encodedObj = Buffer.from(objString).toString('base64')

try {
    mercadopago.configure({
        access_token:'TEST-2593734153674674-081009-5fd5772eadcab328bf94d4ddeaea0d72-1444277109'
    })
    const result = await mercadopago.preferences.create({
        items:[
            {
                title: 'Sesion psicologo',
                unit_price:Number(tarifa),
                currency_id:'USD',
                quantity:1,
            }
        ],
        back_urls:{
                success:`http://localhost:5173/success?data=${encodedObj}`,
                // success: `http://localhost:3001/psiconection/citas/reservarCita/crear?data=${encodedObj}`,
                failure:`http://localhost:3001/psiconection/citas/reservarCita/crear?data=${encodedObj}`,
                pending:''
        },
        auto_return: 'approved',
        notification_url:`https://a175-190-138-148-106.ngrok.io/psiconnection/payment/webhook?data=${encodedObj}`
    })
    return res.status(200).json(result)
    console.log(result);
    
} catch (error) {
    res.status(500).json({error: error.message})
}}


const receiveWebhook = async (req, res) => {
const payment = req.query;
const { data } = req.query; 
console.log('paso por aqui');
const decodedObj = JSON.parse(Buffer.from(data, 'base64').toString('utf-8'));
console.log('dataDescifrada', decodedObj);

try {
    if(payment.type === 'payment'){
        const data = await mercadopago.payment.findById(payment['data.id'])
        console.log(data)
    }
    res.status(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  receiveWebhook,
};
