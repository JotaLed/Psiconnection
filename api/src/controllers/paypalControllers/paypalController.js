
const axios = require('axios');
const request = require('request');
const{ PAYPAL_API, HOST, PAYPAL_API_CLIENT, PAYPAL_API_SECRET } = require('../../config.js')


// const CLIENT = process.env.PAYPAL_API_CLIENT
// const SECRET = process.env.PAYPAL_API_KEY
// const PAYPAL_API_LOCAL = process.env.PAYPAL_API_LOCAl
// const PAYPAL_API = process.env.PAYPAL_API



// const auth = { user: CLIENT, pass: SECRET}

const createOrder = async (req, res) => {
    try {
        const order = {
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: "80.00",
              },
              payee: {
               email_address: "sb-gpdx327118958@personal.example.com",
               amount: {
                 currency_code: "USD",
                 value: "40.00",
                    },
                    payee: {
                    email_address: "sb-jsci927131994@personal.example.com",
                 },
            } 
            },
            // {
            //     amount: {
            //         currency_code: "USD",
            //         value: "40.00",
            //       },
            //       payee: {
            //         email_address: "sb-jsci927131994@personal.example.com",
            //       },
            // }
            ],
          application_context: {
            brand_name: "mycompany.com",
            landing_page: "NO_PREFERENCE",
            user_action: "PAY_NOW",
            return_url: `${HOST}/pay/paymentCapture`,
            cancel_url: `${HOST}/pay/paymentCancel`,
          },
        };
    
        // format the body
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");
    
        // Generate an access token
        const {
          data: { access_token },
        } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params,
          {
            // headers: {
            //   "Content-Type": "application/x-www-form-urlencoded",
            // },
            auth: {
              username: PAYPAL_API_CLIENT,
              password: PAYPAL_API_SECRET,
            },
          }
        );
    
        console.log(access_token);
          
        // //! codigo funcional 
        // // make a request
        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`,order,{
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        console.log(response.data);
 
   
        return res.json(response.data);

        // //! prueba 

        // const order = {
        //     intent: "Capture",
        //     purchase_units: [
        //       {
        //         amount: {
        //           currency_code: "USD",
        //           value: "85.00",
        //         },
        //         payee: {
        //           email_address: "sb-gpdx327118958@personal.example.com",
        //         },
        //       },
        //       {
        //         amount: {
        //           currency_code: "USD",
        //           value: "40",
        //         },
        //         payee: {
        //           email_address: "sb-jsci927131994@personal.example.com",
        //         },
        //       },
        //     ],
        //     application_context: {
        //       brand_name: "mycompany.com",
        //       landing_page: "NO_PREFERENCE",
        //       user_action: "PAY_NOW",
        //       return_url: `${HOST}/pay/paymentCapture`,
        //       cancel_url: `${HOST}/pay/paymentCancel`,
        //     },
        //   };
      
        //   // Resto del código...
      
        //   // Hacer la solicitud
        //   const response = await axios.post(
        //     `${PAYPAL_API}/v2/checkout/orders`,
        //     order,
        //     {
        //       headers: {
        //         Authorization: `Bearer ${access_token}`,
        //       },
        //     }
        //   );
      
        //   console.log(response.data.details);
      
        //   return res.json(response.data);

      } catch (error) {
        console.log(error);
        return res.status(500).json("Something goes wrong");
      }
    };


const captureOrder = async (req, res) => {
    const { token } = req.query;
 try {
     const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
        auth: {
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET
        }
     })
     console.log(response.data);
     return res.send('send')
    
 } catch (error) {
    console.log(error.data.details);
    res.status(400).send("Ups algo salio mal...")
 }
    
}

const cancelOrder = (req, res) => {
    res.send('orden cancelada')
}


module.exports = {
    createOrder,
    captureOrder,
    cancelOrder
}