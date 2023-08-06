export const validateForm = (formData) => {
    const {
      nombre,
      apellido,
      fecha_nacimiento,
      pais,
      genero,
      email,
      password,
      telefono,
      tipoUsuario,
      especialidad,
    } = formData;
  
    if (!nombre || !apellido || !pais || !fecha_nacimiento || !genero || !email || !password || !telefono) {
      return false;
    }
  
    if (tipoUsuario === "psicologo" && !especialidad) {
      return false;
    }
  
    return true; 
  };
  