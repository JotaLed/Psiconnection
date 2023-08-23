const { Router } = require('express');

const { createOrder,receiveSuccessQuery ,receiveWebhook, receiveFailureQuery }  = require('../controllers/paymentController/paymentController')

const routerPayment = Router()

//ruta que crea la orden de pago
routerPayment.post('/create-order', createOrder)

//ruta que lleva al completar el pago
routerPayment.get('/success', (req,res) => res.send('payment success'))

//ruta en caso que el pago haya fallado
routerPayment.get('/failure', (req,res) => res.send('payment failure'))

//caso que el pago este pendiente
routerPayment.get('/pending', (req,res) => res.send('payment pending'))

//ruta para recibir los webhooks del servicio de mercadoPago
routerPayment.post('/webhook', receiveWebhook)


module.exports = routerPayment;