

 // funcion para obtener fecha actual
 function obtenerFechaActual() {
    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1; // Los meses en JavaScript se cuentan desde 0 (enero = 0)
    var anio = fecha.getFullYear();

  
    // Formato de salida: DD/MM/AAAA HH:MM:SS
    var fechaActual = dia + '/' + mes + '/' + anio
    return fechaActual;
  }

  module.exports = obtenerFechaActual;