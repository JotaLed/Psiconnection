require("dotenv").config();
const mercadopago = require('mercadopago')

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
                success:`https://localhost:3001/home`,
                failure:'https://localhost:3001/home',
                pending:''
        },
        auto_return: 'approved',
        notification_url:'https://88fe-190-138-148-106.ngrok.io/webhook'
    })
    return res.status(200).json(result)
} catch (error) {
    res.status(500).json({error: error.message})
}}

// const receiveWebhook = async (req, res) => {
// const payment = req.query
// try {
//     if(payment.type === 'payment'){
//         const data = await mercadopago.payment.findById(payment['data.id'])
//         console.log(data)
//     }
//     res.status(204);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

module.exports = {
  createOrder,
//   receiveSuccessQuery,
//   receiveFailureQuery
//   receiveWebhook,
};
