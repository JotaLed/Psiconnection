
// // Función para validar el formato del correo electrónico
// export const isValidEmail = (email) => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };

// Función para validar que la contraseña sea alfanumérica y tenga al menos 6 caracteres
// const isValidPassword = (value) => {
//   // Expresión regular para validar contraseña
//   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
//   return passwordRegex.test(value); // Verifica si la contraseña cumple con la expresión regular
// };
// export { isValidPassword}



// // Función para validar que el usuario sea mayor de 18 años basándose en su fecha de nacimiento
// export const isAdult = (fecha_nacimiento) => {
//   const today = new Date();
//   const birthDate = new Date(fecha_nacimiento);
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const monthDiff = today.getMonth() - birthDate.getMonth();

//   if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }

//   return age >= 18;
// };

// // Función para validar que todos los campos obligatorios estén completos
// export const areAllFieldsFilled = (formData) => {
//   for (const key in formData) {
//     if (formData.hasOwnProperty(key)) {
//       if (formData[key] === "") {
//         return false;
//       }
//     }
//   }
//   return true;
// };

// // Función para validar la longitud mínima y máxima de un campo
// export const isValidLength = (value, minLength, maxLength) => {
//   return value.length >= minLength && value.length <= maxLength;
// };

// //Función para verificar la disponibilidad de un correo electrónico en el servidor
// export const isEmailAvailable = async (email) => {
//   try {
//     const response = await axios.get(`/api/checkEmailAvailability?email=${email}`);
//     return response.data.available;
//   } catch (error) {
//     console.error("Error al verificar la disponibilidad del correo electrónico:", error);
//     return false;
//   }
// };


// // Función para validar el formulario
// export const validateForm = (formData) => {
//   const {
//     nombre,
//   apellido,
//   email,
//   fecha_nacimiento,
//   contraseña,
//   pais,
//   zona_horaria,
//   horario,
//   genero,
//   licencia,
//   tarifa,
//   especialidad,
//   whatsAppUrl,
//   telefono,
//   descripcion,
//     roll,
//   } = formData;

//   const errors = {};

//   if (!nombre || !apellido || !pais || !fecha_nacimiento || !genero || !email || !contraseña || !telefono  ) {
//     errors.general = "Todos los campos son obligatorios.";
//   }

//   if (!isValidEmail(email)) {
//     errors.email = "Ingresa un correo electrónico válido.";
//   }

//   if (!isValidPassword(contraseña)) {
//     errors.contraseña = "La contraseña debe ser alfanumérica y tener al menos 6 caracteres.";
//   }

//   if (!isAdult(fecha_nacimiento)) {
//     errors.fecha_nacimiento = "Debes ser mayor de 18 años para registrarte.";
//   }

//   if (!isValidLength(nombre, 2, 50)) {
//     errors.nombre = "El nombre debe tener entre 2 y 50 caracteres.";
//   }

//   if (!isValidLength(apellido, 2, 50)) {
//     errors.apellido = "El apellido debe tener entre 2 y 50 caracteres.";
//   }

//   if (!isValidLength(pais, 2, 50)) {
//     errors.pais = "El país debe tener entre 2 y 50 caracteres.";
//   }

//   if (!genero) {
//     errors.genero = "Selecciona tu género.";
//   }

//   if (!areAllFieldsFilled(formData)) {
//     errors.general = "Todos los campos son obligatorios.";
//   }

//   // Validar especialidad solo si es psicólogo
//   if (roll === "psicologo" && !especialidad) {
//     errors.especialidad = "La especialidad es obligatoria para psicólogos.";
//   }
  
//   if (roll === "psicologo" &&  !horario) {
//     errors.horario = "Selecciona un horario.";
//   }
  
//   if (roll === "psicologo" && !isValidLength(licencia, 2, 50)) {
//     errors.licencia = "La licencia debe tener entre 2 y 50 caracteres.";
//   }
  
//   if (roll === "psicologo" && !isValidLength(descripcion, 2, 1000)) {
//     errors.descripcion = "La descripcion debe tener mínimo 10 caracteres .";
//   }

//   if (roll === "psicologo" && !isValidLength(tarifa, 2, 4)) {
//     errors.tarifa = "La tarifa debe tener entre 2 y 4 caracteres.";
//   }

//   if (roll === "psicologo" && !isValidLength(zona_horaria, 2, 4)) {
//     errors.zona_horaria = "La zona horaria debe ser valida.";
//   }

//   const urlPattern = /^https:\/\/wa\.me\/\d+\/\?text=.*/;

// if (roll === "psicologo" && !urlPattern.test(whatsAppUrl)) {
//   errors.whatsAppUrl = "El enlace de WhatsApp no es válido.";
// }
//   return {
//     isValid: Object.keys(errors).length === 0,
//     errors,
//   };
// };

