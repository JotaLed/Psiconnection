require("dotenv").config();
const { Psicologo } = require("../../db");
const { Op } = require("sequelize");
const { getPsicologosController } = require('../psicologosController')
const mercadopago = require('mercadopago')

const tarifaPsico = async() => { 
    const response = await Psicologo.findAll({
        attributes: [
            'tarifa',
        ],
    })
   return response
}

const createOrder = async (req, res) => {
    const {tarifa} = req.query
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
                success:'/home',
                failure:'/home',
                pending:'/home'
        },
        notification_url:'https://9188-190-138-148-106.ngrok.io/webhook'
    })
    console.log(result)
    res.send(result)
};
const receiveWebhook = async (req, res) => {
const payment = req.query
try {
    if(payment.type === 'payment'){
        const data = await mercadopago.payment.findById(payment['data.id'])
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
