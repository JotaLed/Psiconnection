import React, { useState } from "react";
import "./form.css";
import { validateForm } from "./validaciones";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    pais: "",
    genero: "",
    email: "",
    password: "",
    telefono: "",
    tipoUsuario: "",
    especialidad: "",
    fotoPerfil: "",
    isLogin: false,
  });

  const [especialidadesSeleccionadas, setEspecialidadesSeleccionadas] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEspecialidadesChange = (event) => {
    const { options } = event.target;
    const selectedEspecialidades = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedEspecialidades.push(options[i].value);
      }
    }
    setEspecialidadesSeleccionadas(selectedEspecialidades);
  };

  const handleUserTypeSelect = (userType) => {
    setFormData((prevData) => ({
      ...prevData,
      tipoUsuario: userType,
      isLogin: true, 
    }));
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const isValid = validateForm(formData);
    if (isValid) {
      // Aquí puedes enviar los datos del formulario al servidor
      console.log("Formulario válido, datos enviados:", formData);
    } else {
      console.log("Formulario inválido, corrige los campos.");
    }
  };
//   if (isValid) {
//     try {
//       if (formData.isLogin) {
//         // Iniciar sesión
//         const response = await axios.post("/api/login", formData);
//         console.log("Inicio de sesión exitoso:", response.data);
//       } else {
//         // Registro de nuevo usuario
//         const response = await axios.post("http://localhost:3001/psiconection/registerPsicologo ", formData);
//         console.log("Registro exitoso:", response.data);
//       }
//     } catch (error) {
//       console.error("Error al enviar los datos:", error);
//     }
//   } else {
//     console.log("Formulario inválido, corrige los campos.");
//   }
// };
 
 // Función para cambiar entre modo de inicio de sesión y modo de registro
 const toggleLogin = () => {
   setFormData((prevData) => ({
     ...prevData,
     isLogin: !prevData.isLogin,
   }));
    };

  return (
    <div className="form-container">
     <div >
      {/* <h2>{formData.isLogin ? "" : ""}</h2> */}
      {!formData.tipoUsuario && !formData.isLogin && (
         <div>
          <p className="p1">¡Hola!</p>
          <p className="p2">Selecciona tu tipo de usuario:</p>
         <div>
           <button onClick={() => handleUserTypeSelect("psicologo")}>Soy Psicólogo</button>
           <button onClick={() => handleUserTypeSelect("consultante")}>Soy Consultante</button>
         </div>
       </div>
      )}
    </div>
    <div className="right-side">
       {/* <img src="./imagenForm.png" alt="IMAGEN" />   */}
    </div>
      {formData.tipoUsuario && (
        <form onSubmit={handleSubmit}>
          {formData.isLogin ? (
            <>
              <h3>INICIAR SESIÓN </h3>
                <label className="form-label">
                  Email
                </label>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

                <label className="form-label">
                  Password
                </label>
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit">Iniciar sesión</button>
              <p>
                ¿No tienes cuenta? <hr />
                  <p className="p2" onClick={toggleLogin}>
                    Registrarse
                  </p>
              </p> 
            </>
          ) : (
            <>
              <h3>Registro de nuevo usuario</h3>
              <label>Nombre:</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

              <label>Apellido:</label>
              <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />

              <label>Fecha de Nacimiento:</label>
              <input
                type="date"
                name="fecha_nacimiento"
                value={formData.fecha_nacimiento}
                onChange={handleChange}
                required
              />

              <label>País:</label>
              <input type="text" name="pais" value={formData.pais} onChange={handleChange} required />

              <label>Género:</label>
              <select type="text" name="genero" value={formData.genero} onChange={handleChange} required>
                <option value="">Seleccione...</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>

              <label>Teléfono:</label>
              <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} required />

              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />

              <label>Contraseña:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />

              {formData.tipoUsuario === "psicologo" && (
                <>
                  <label>Foto de Perfil:</label>
                  <input
                    type="file"
                    name="fotoPerfil"
                    value={formData.fotoPerfil}
                    onChange={handleChange}
                    required
                  />

                  <div>
                    <label>Especialidades:</label>
                    <select
                      name="especialidad"
                      multiple
                      value={especialidadesSeleccionadas}
                      onChange={handleEspecialidadesChange}
                      required
                    >
                      <option value="psicologia_clinica">Psicología Clínica</option>
                      <option value="terapia_de_pareja">Terapia de Pareja</option>
                      <option value="psicologia_infantil">Psicología Infantil</option>
                    </select>
                  </div>
                </>
              )}

              {formData.tipoUsuario === "consultante" && (
                <>
                  
                </>
              )}

              <button type="submit">Registrar</button>
            </>
          )}
        </form>
      )}
    </div>
  );
};

export default Form;