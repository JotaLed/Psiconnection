require("dotenv").config();
const mercadopago = require('mercadopago')

const createOrder = async (req, res) => {
    const { tarifa } = req.query;
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
                success:'http://localhost:5173/home',
                failure:'https://localhost:3001/psiconnection/payment/failure',
                pending:'https://localhost:3001/psiconnection/payment/pending'
        },
        notification_url:'https://88fe-190-138-148-106.ngrok.io/webhook'
    })
    res.status(200).json(result)
} catch (error) {
    res.status(400).json(error.message)
}};

// const receiveSuccessQuery = async (req, res) => {
//     const status = req.query
//     if(status.status === 'approved'){
//         res.status(200).json('approved payment')
        
//     } else{
//         res.status(500).json('failure payment')
//     }
//     console.log('status:',status.status)
// };

// const receiveFailureQuery = async (req, res) => {
//     const status = req.query
//     console.log('status:',status.status)
// };

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
