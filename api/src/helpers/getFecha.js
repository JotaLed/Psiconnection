

 // funcion para obtener fecha actual
 function obtenerFechaActual() {
  var fecha = new Date();
  var anio = fecha.getFullYear();
  var mes = ('0' + (fecha.getMonth() + 1)).slice(-2); // Los meses en JavaScript se cuentan desde 0 (enero = 0)
  var dia = ('0' + fecha.getDate()).slice(-2);
  var horas = ('0' + fecha.getHours()).slice(-2);
  var minutos = ('0' + fecha.getMinutes()).slice(-2);
  var segundos = ('0' + fecha.getSeconds()).slice(-2);

  // Formato de salida: YYYY-MM-DD HH:MM:SS+00:00
  var fechaActual = anio + '-' + mes + '-' + dia + ' ' + horas + ':' + minutos + ':' + segundos + '+00:00';
  return fechaActual;
}

  module.exports = obtenerFechaActual;