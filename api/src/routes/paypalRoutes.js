const { Router } = require('express');

const {
    createOrder,
    captureOrder,
    cancelOrder
} = require('../controllers/paypalControllers/paypalController.js')

const paypalRoutes = Router();


paypalRoutes.get('/paymentOrder',createOrder);

paypalRoutes.get('/paymentCapture', captureOrder); 

paypalRoutes.get('/paymentCancel', cancelOrder)

module.exports = paypalRoutes;