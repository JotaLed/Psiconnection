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
    mercadopago.configure({
        access_token:'TEST-2593734153674674-081009-5fd5772eadcab328bf94d4ddeaea0d72-1444277109'
    })
    const result = await mercadopago.preferences.create({
        items:[
            {
                title: 'Sesion psicologo',
                unit_price:100,
                currency_id:'USD',
                quantity:1,
            }
        ],
        back_urls:{
                success:'https://918f-190-138-148-106.ngrok.io/psiconection/payment/success',
                failure:'https://918f-190-138-148-106.ngrok.io/psiconection/payment/failure',
                pending:'https://918f-190-138-148-106.ngrok.io/psiconection/payment/pending'
        },
        notification_url:'https://918f-190-138-148-106.ngrok.io/psiconection/payment/webhook'
    })
    console.log(result)

    res.send('creando orden')
};

const receiveWebhook = (req, res) => {
console.log(req.query)
res.send('webhook')
};

module.exports = {
    createOrder,
    receiveWebhook,
};