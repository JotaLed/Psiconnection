// import React, { useEffect, useState } from "react";
// import "./form.css";
// import { validateForm } from "./validaciones";
// import axios from "axios";

// const Form = () => {
//   const [formData, setFormData] = useState({
//     nombre: "",
//     apellido: "",
//     email: "",
//     fecha_nacimiento: "",
//     contraseña: "",
//     pais: "",
//     zona_horaria: "",
//     horario: "",
//     genero: "",
//     licencia: "",
//     tarifa: "",
//     especialidad: "",
//     whatsAppUrl: "",
//     telefono: "",
//     descripcion: "",
//     fotoPerfil: "",
//     roll: "",
//     isLogin: false,
//   });

//   //! TODO: estado para almacenar los paises
//   const [paises, setPaises] = useState([]);

//   //! TODO: llamo a la api para traerme todos los paises y sus horarios
//   useEffect(() => {
//     axios
//       .get("https://restcountries.com/v3.1/all")
//       .then((response) => response.data)
//       .then((data) => {
//         const paises = data.map((pais) => {
//           return {
//             nombre: pais.name.common,
//             zona_horaria: pais.timezones[0],
//           };
//         });
//         setPaises(paises);
//       });
//   }, []);
//   console.log("todos los paises", paises);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // const handleUserTypeSelect = (roll) => {
//   //   setFormData((prevData) => ({
//   //     ...prevData,
//   //     roll: roll,
//   //     isLogin: true,
//   //   }));
//   // };
//   const handleUserTypeSelect = (roll) => {
//     if (roll === "psicologo") {
//       setFormData({
//         roll: roll,
//         nombre: "",
//         apellido: "",
//         email: "",
//         fecha_nacimiento: "",
//         contraseña: "",
//         pais: "",
//         zona_horaria: "",
//         horario: "",
//         genero: "",
//         licencia: "",
//         tarifa: "",
//         especialidad: "",
//         whatsAppUrl: "",
//         telefono: "",
//         descripcion: "",
//         fotoPerfil: "",
//         isLogin: false,
//       });
//     } else if (roll === "usuario") {
//       setFormData({
//         roll: roll,
//         nombre: "",
//         apellido: "",
//         fecha_nacimiento: "",
//         pais: "",
//         genero: "",
//         email: "",
//         contraseña: "",
//         telefono: "",
//         isLogin: false,
//       });
//     }
//   };

//   const [formErrors, setFormErrors] = useState({});

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log(formData); // Agregar esta línea para imprimir los datos del formulario
//     const { isValid, errors } = validateForm(formData);

//     if (!isValid) {
//       console.log("El formulario no es válido. Por favor, revisa los campos.");
//       console.log(errors); // Agregar esta línea para ver los errores específicos
//       setFormErrors(errors);
//       return;
//     }
//     console.log("Formulario válido, datos enviados:", formData);
//     //! Acá envío los datos al back
//     try {
//       if (formData.isLogin) {
//         // Iniciar sesión
//         const response = await axios.post("/api/login", formData);
//         console.log("Inicio de sesión exitoso:", response.data);
//       } else {
//         // Registro de nuevo usuario
//         if (formData.roll === "psicologo") {
//           //registro para psicologo
//           const response = await axios.post(
//             "/psiconection/registerPsicologo",
//             formData
//           );
//           console.log("Registro exitoso:", response.data);
//         } else if (formData.roll === "usuario") {
//           //registro para consultante
//           const response = await axios.post(
//             "/psiconection/registerUsuario",
//             formData
//           );
//           console.log("Registro exitoso:", response.data);
//         }
//       }
//     } catch (error) {
//       console.error("Error al enviar los datos:", error);
//       setFormErrors({
//         general: "Ocurrió un error. Por favor, inténtalo de nuevo más tarde.",
//       });
//     }
//   };

//   // Función para cambiar entre modo de inicio de sesión y modo de registro
//   const toggleLogin = () => {
//     setFormData((prevData) => ({
//       ...prevData,
//       isLogin: !prevData.isLogin,
//     }));
//     // Limpiar los errores cuando se cambia entre modo de inicio de sesión y registro
//     setFormErrors({});
//   };

//   return (
//     <div className="form-container">
//       {!formData.roll && (
//         <div className="form-content">
//           <div className="left-side">
//             <div className="p1">¡Hola!</div>
//             <div className="p2">Selecciona tu tipo de usuario:</div>
//             <div>
//               <button onClick={() => handleUserTypeSelect("psicologo")}>
//                 Soy Psicólogo
//               </button>
//               <button onClick={() => handleUserTypeSelect("usuario")}>
//                 Soy Consultante
//               </button>
//             </div>
//           </div>
//           <div className="right-side">
//             <img src="./imagenForm.png" alt="IMAGEN" />
//           </div>
//         </div>
//       )}

//       {formData.roll && (
//         <div className="form-content">
//           <form onSubmit={handleSubmit} className="form">
//             {formData.isLogin ? (
//               <>
//                 <h3>INICIAR SESIÓN</h3>
//                 <div className="form-row">
//                   <label htmlFor="email">Email:</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                   {formErrors.email && (
//                     <span className="error">{formErrors.email}</span>
//                   )}
//                 </div>

//                 <div className="form-row">
//                   <label htmlFor="contraseña">Contraseña:</label>
//                   <input
//                     type="contraseña"
//                     id="contraseña"
//                     name="contraseña"
//                     value={formData.contraseña}
//                     onChange={handleChange}
//                     required
//                   />
//                   {formErrors.contraseña && (
//                     <span className="error">{formErrors.contraseña}</span>
//                   )}
//                 </div>

//                 <button type="submit">Iniciar sesión</button>
//                 <p>¿No tienes cuenta?</p>
//                 <div className="p3" onClick={toggleLogin}>
//                   ¡Registrate!
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="form-row">
//                   <label htmlFor="nombre">Nombre:</label>
//                   <input
//                     type="text"
//                     id="nombre"
//                     name="nombre"
//                     value={formData.nombre}
//                     onChange={handleChange}
//                     required
//                   />
//                   {formErrors.nombre && (
//                     <span className="error">{formErrors.nombre}</span>
//                   )}
//                 </div>

//                 <div className="form-row">
//                   <label htmlFor="apellido">Apellido:</label>
//                   <input
//                     type="text"
//                     id="apellido"
//                     name="apellido"
//                     value={formData.apellido}
//                     onChange={handleChange}
//                     required
//                   />
//                   {formErrors.apellido && (
//                     <span className="error">{formErrors.apellido}</span>
//                   )}
//                 </div>

//                 <div className="form-row">
//                   <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
//                   <input
//                     type="date"
//                     id="fecha_nacimiento"
//                     name="fecha_nacimiento"
//                     value={formData.fecha_nacimiento}
//                     onChange={handleChange}
//                     required
//                   />
//                   {formErrors.fecha_nacimiento && (
//                     <span className="error">{formErrors.fecha_nacimiento}</span>
//                   )}
//                 </div>

//                 <div className="form-row">
//                   <label htmlFor="pais">País:</label>
//                   <input
//                     type="text"
//                     id="pais"
//                     name="pais"
//                     value={formData.pais}
//                     onChange={handleChange}
//                     required
//                   />
//                   {formErrors.pais && (
//                     <span className="error">{formErrors.pais}</span>
//                   )}
//                 </div>

//                 <div className="form-row">
//                   <label htmlFor="genero">Género:</label>
//                   <select
//                     id="genero"
//                     name="genero"
//                     value={formData.genero}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Seleccione...</option>
//                     <option value="masculino">Masculino</option>
//                     <option value="femenino">Femenino</option>
//                     <option value="otro">Otro</option>
//                   </select>
//                   {formErrors.genero && (
//                     <span className="error">{formErrors.genero}</span>
//                   )}
//                 </div>

//                 <div className="form-row">
//                   <label htmlFor="telefono">Teléfono:</label>
//                   <input
//                     type="text"
//                     id="telefono"
//                     name="telefono"
//                     value={formData.telefono}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-row">
//                   <label htmlFor="email">Email:</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                   {formErrors.email && (
//                     <span className="error">{formErrors.email}</span>
//                   )}
//                 </div>

//                 <div className="form-row">
//                   <label htmlFor="contraseña">Contraseña:</label>
//                   <input
//                     type="password"
//                     id="contraseña"
//                     name="contraseña"
//                     value={formData.contraseña}
//                     onChange={handleChange}
//                     required
//                   />
//                   {formErrors.contraseña && (
//                     <span className="error">{formErrors.contraseña}</span>
//                   )}
//                 </div>

//                 {formData.roll === "psicologo" && (
//                   <>
//                     <div className="right-column">
//                       <div className="form-row">
//                         <label htmlFor="especialidad">Especialidad:</label>
//                         <select
//                           id="especialidad"
//                           name="especialidad"
//                           value={formData.especialidad}
//                           onChange={handleChange}
//                           required
//                         >
//                           <option value="">Seleccione...</option>
//                           <option value="psicologia_clinica">
//                             Psicología Clínica
//                           </option>
//                           <option value="terapia_de_pareja">
//                             Terapia de Pareja
//                           </option>
//                           <option value="psicologia_infantil">
//                             Psicología Infantil
//                           </option>
//                         </select>
//                       </div>

//                       <div className="form-row">
//                         <label htmlFor="licencia">Licencia:</label>
//                         <input
//                           type="text"
//                           id="licencia"
//                           name="licencia"
//                           value={formData.licencia}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                       <div className="form-row">
//                         <label htmlFor="tarifa">Tarifa:</label>
//                         <input
//                           type="text"
//                           id="tarifa"
//                           name="tarifa"
//                           value={formData.tarifa}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>

//                       <div className="form-row">
//                         <label htmlFor="horario">Horario:</label>
//                         <select
//                           id="horario"
//                           name="horario"
//                           value={formData.horario}
//                           onChange={handleChange}
//                           required
//                         >
//                           <option value="">Seleccione...</option>
//                           <option value="am">AM</option>
//                           <option value="pm">PM</option>
//                         </select>
//                       </div>

//                       <div className="form-row">
//                         <label htmlFor="zona_horaria">Zona horaria:</label>
//                         <input
//                           type="text"
//                           id="zona_horaria"
//                           name="zona_horaria"
//                           value={formData.zona_horaria}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>

//                       <div className="form-row">
//                         <label htmlFor="whatsAppUrl">Link whatsApp:</label>
//                         <input
//                           type="text"
//                           id="whatsAppUrl"
//                           name="whatsAppUrl"
//                           value={formData.whatsAppUrl}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>

//                       <div className="form-row">
//                         <label htmlFor="descripcion">Descripción:</label>
//                         <input
//                           type="text"
//                           id="descripcion"
//                           name="descripcion"
//                           value={formData.descripcion}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>

//                       <label htmlFor="fotoPerfil">Foto de Perfil:</label>
//                       <input
//                         type="file"
//                         id="fotoPerfil"
//                         name="fotoPerfil"
//                         value={formData.fotoPerfil}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </>
//                 )}

//                 <button type="submit">Registrar</button>
//               </>
//             )}
//           </form>

//           <div className="right-side2">
//             <img src="./RegistroImg.png" alt="IMAGEN_R" />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Form;
