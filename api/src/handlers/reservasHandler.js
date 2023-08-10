const { reservaCita } = require('../controllers/reservaController')


const reservarCitaHandler = async(req, res) => {
    const { idPsico, idUser, fecha, hora } = req.body;
    try {
        const postReserva = await reservaCita({ idPsico, idUser, fecha, hora })
        res.status(200).json(postReserva);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}




module.exports = {
    reservarCitaHandler
};