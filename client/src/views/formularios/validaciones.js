const isValidPassword = (value) => {
    // Expresión regular para validar contraseña
    const passwordRegex = /^(?=.*[A-Za-z0-9ñÑ@$!%*?&])[A-Za-z0-9ñÑ@$!%*?&]{6,}$/;

    return passwordRegex.test(value); // Verifica si la contraseña cumple con la expresión regular
  };
  export { isValidPassword}

  const isValidName = (name) => {
    return name.length >= 3 && name.length < 50;
  };
  export {isValidName};

  export const isValidDate = (value) => {
    const currentDate = new Date();
    const selectedDate = new Date(value);
  
    const age = currentDate.getFullYear() - selectedDate.getFullYear();
    return age >= 18;
  };

  export const isValidTel = (value) => {
    // Lógica de validación de teléfono aquí
    if (!/^[0-9]*$/.test(value)) {
      return 'Ingresa solo números';
    }
    if (value.length < 10) {
      return 'Ingresa al menos 10 dígitos';
    }
    // Otras validaciones si es necesario
    return true; // Devuelve true si el teléfono es válido
  };
  
  