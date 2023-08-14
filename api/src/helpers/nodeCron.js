// const cron = require("node-cron");
// const Reserva = require("../db.js");

// const changePendingAppointments = cron.schedule("* * * * * *", async () => {
//   try {
//     const currentDate = new Date(); //2023-08-14T11:23:30.708Z

//     const pendingAppointments = await Reserva.findAll({
//       where: { estado: "pendiente" },
//     });

//     //  "fecha": "12/8/23",
//     // "hora": "10-11",

//     for (const appointment of pendingAppointments) {
//       const appointmentsDate = new Date(
//         appointment.fecha + " " + appointment.hora
//       );

//       if (reservaDate <= currentDate) {
//         // Si la fecha y hora de la reserva son iguales o mayores que la actual
//         appointment.estado = "finalizado"; // Cambia el estado a "finalizado"
//         await appointment.save(); // Guarda los cambios en la base de datos
//       }
//     }
//   } catch (error) {
//     console.error("Error en la tarea cron:", error);
//   }
// });

// module.exports = changePendingAppointments;

const cron = require("node-cron");
const { Reserva } = require("../db.js");

const changePendingAppointments = cron.schedule("* * * * *", async () => {
  try {
    const currentDate = new Date(); // 2023-08-14T11:23:30.708Z

    const pendingAppointments = await Reserva.findAll({
      where: { estado: "pendiente" },
    });

    for (const appointment of pendingAppointments) {
      const fechaParts = appointment.fecha.split("/");
      const year = 2000 + parseInt(fechaParts[2]);
      const month = parseInt(fechaParts[1]) - 1;
      const day = parseInt(fechaParts[0]);

      const horaParts = appointment.hora.split("-");
      const startHour = parseInt(horaParts[0]);
      const endHour = parseInt(horaParts[1].split("-")[1]);

      const appointmentStart = new Date(year, month, day, startHour);
      const appointmentEnd = new Date(year, month, day, endHour);

      // Combina la fecha de la reserva con la hora de finalización
      appointmentEnd.setFullYear(year, month, day);

      if (appointmentEnd <= currentDate) {
        // Si la fecha y hora de finalización de la cita son menores o iguales a la fecha y hora actual
        appointment.estado = "finalizado"; // Cambia el estado a "finalizado"
        await appointment.save(); // Guarda los cambios en la base de datos
        console.log(
          `Se cambió el estado de la reserva ${appointment.id} a finalizado.`
        );
      }
    }
  } catch (error) {
    console.error("Error en la tarea cron:", error);
  }
});

module.exports = changePendingAppointments;
