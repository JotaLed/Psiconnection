const cron = require("node-cron");
const { Reserva } = require("../db.js"); // Importa el modelo de reservas

const changePendingAppointments = cron.schedule("0 * * * *", async () => {
  try {
    const currentDate = new Date();

    const pendingReservations = await Reserva.findAll({
      where: { estado: "pendiente" }, // Busca reservas con estado "activo"
    });

    for (const reserva of pendingReservations) {
      const reservaDateParts = reserva.fecha.split("/"); // Divide la fecha en partes (DD/MM/YY)
      const reservaHourParts = reserva.hora.split("-"); // Divide la hora en partes (HH-HH)

      const year = 2000 + parseInt(reservaDateParts[2]); // Convierte el año a 4 dígitos (20YY)
      const month = parseInt(reservaDateParts[1]) - 1; // Resta 1 al mes para que sea compatible con Date (0-11)
      const day = parseInt(reservaDateParts[0]);
      const endHour = parseInt(reservaHourParts[1].split("-")[0]); // Toma el segundo número después del guion como hora de finalización

      const reservaDate = new Date(year, month, day, endHour);

      if (reservaDate <= currentDate) {
        // console.log("Cambiando estado de reserva:", reserva.id);
        reserva.estado = "finalizado"; // Cambia el estado a "finalizado"
        await reserva.save(); // Guarda los cambios en la base de datos
        // console.log("Estado cambiado:", reserva.estado);
      }
      // console.log(reserva);
    }
  } catch (error) {
    console.error("Error en la tarea cron:", error);
  }
});

module.exports = changePendingAppointments;
