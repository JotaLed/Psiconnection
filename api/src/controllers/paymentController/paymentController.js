require("dotenv").config();
const mercadopago = require('mercadopago')

const createOrder = async (req, res) => {
    const { tarifa } = req.query;
    const { turno } = req.body
    console.log(turno)

    mercadopago.configure({
        access_token:'TEST-2593734153674674-081009-5fd5772eadcab328bf94d4ddeaea0d72-1444277109'
    })
    try {
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
                    success:`http://localhost:5173/home`,
                    failure:'http://localhost:5173/home',
                    pending:'http://localhost:5173/home'
            },
            notification_url:'https://7d98-190-138-148-106.ngrok.io/psiconnection/payment/webhook' 
        })
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }

};
const receiveWebhook = async (req, res, next) => {
const payment = req.query
try {
    if(payment.type === 'payment'){
        const data = await mercadopago.payment.findById(payment['data.id'])
        console.log('query',req.query)
        res.status(200).json(data)
    }
    // res.status(204);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  receiveWebhook,
};
