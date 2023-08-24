//-----------------------------------exportacion de types---------------------------------//
export const SET_FILTER = "SET_FILTER";
export const SET_ORDERS = "SET_ORDERS";
export const GET_PSICOLOGOS = "GET_PSICOLOGOS";
export const LOAD_DETAIL = "LOAD_DETAIL";
export const SEARCH_APELLIDO = "SEARCH_APELLIDO";
export const UPDATE_PSIC = "UPDATE_PSIC";
export const GET_SPECIALITIES = "GET_SPECIALITIES";
export const GET_DETAIL = "GET_DETAIL";
export const GET_DETAIL_CLIENT = "GET_DETAIL_CLIENT";
export const GET_DETAIL_PSICOLOGO = "GET_DETAIL_PSICOLOGO";
export const GET_APPOINTMENTS = "GET_APPOINTMENTS";
export const LOAD_CURRENT_USER = "LOAD_CURRENT_USER"
export const GET_USERS = "GET_USERS"
export const GET_ALL_PSICOLOGOS = "GET_ALL_PSICOLOGOS"
// PROTECCION
export const GET_DETAIL_ACOUNT_PSICOLOGO = "GET_DETAIL_ACOUNT_PSICOLOGO"
export const GET_DETAIL_ACOUNT_USUARIO = "GET_DETAIL_ACOUNT_USUARIO"
export const GET_DETAIL_ACOUNT_ADMIN = "GET_DETAIL_ACOUNT_ADMIN"
export const GET_DETAIL_ACOUNT_PSICOLOGO_CITAS="GET_DETAIL_ACOUNT_PSICOLOGO_CITAS"
//----------------------------------------------------------------------------------------//
import axios from "axios";

export const setFilter = (filters) => {
    //comentario
    return { type: SET_FILTER, payload: filters };
};

export const setOrders = (order) => {
    return { type: SET_ORDERS, payload: order };
};

//-------------------------Action de get psicologos--------------------------------------//
export const getPsicologos = () => {
    return async function (dispatch) {
        const apiData = await axios.get("/psiconection/");
        const psicologos = apiData.data;
        dispatch({ type: GET_PSICOLOGOS, payload: psicologos });
    };
};
//-------------------------Action de get usuarios--------------------------------------//
export const getUsers = () => {
    return async function (dispatch) {
        console.log("Entra al dispatch");
        const apiData = await axios.get("/psiconection/get/users");
        const users = apiData.data;
        dispatch({ type: GET_USERS, payload: users });
    };
};

//--------------------------Action de get by ID------------------------------------------//
export const loadDetail = (id) => {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`/psiconection/${id}`);
            const detail = data;
            return dispatch({
                type: LOAD_DETAIL,
                payload: detail,
            });
        } catch (error) {
            console.log(error.message);
        }
    };
};

//--------------------------action para buscar por name---------------------------------//
export const searchByName = (apellido) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`/psiconection/?apellido=${apellido}`);
            if (response.data.length === 0) {
                alert("Name not found!");
            } else {
                return dispatch({
                    type: "SEARCH_APELLIDO",
                    payload: response.data,
                });
            }
        } catch (error) {
            window.alert("Name not found!");
        }
    };
};

export const updatePsic = (dataToUpdate) => {
    return async function () {
        console.log(dataToUpdate)
        await axios.put("/psiconection/update/psico", dataToUpdate)
            .then(response => console.log(response))
            .catch(error => console.log("Error en la solicitud PUT", error));
    }
};
//-----------------------obtener especialidades------------------------------------//
export const getSpecialities = () => {
    return async function (dispatch) {
        try {
            const apiData = await axios.get(`/psiconection/specialties`);
            const especialidades = apiData.data;
            return dispatch({
                type: GET_SPECIALITIES,
                payload: especialidades,
            });
        } catch (error) {
            console.log(error.message);
        }
    };
};
//-----------------------------obtener detail del psicologo------------------------//
export const getDetail = (id) => {
    return async function (dispatch) {
        try {
            const apiData = await axios.get(`/psiconection/acount/${id}`);
            const psicologo = apiData.data;
            return dispatch({
                type: GET_DETAIL,
                payload: psicologo,
            });
        } catch (error) {
            console.log(error.message);
        }
    };
};


export const updateClient = (dataToUpdate) => {
    return async function () {
        await axios.put("/psiconection/update/user", dataToUpdate)
            .then(response => console.log(response))
            .catch(error => console.log("Error en la solicitud PUT", error));
    }
}
//----------------------------eliminar psicologo----------------------------------//
export const deletePiscologo = (id) => {
    return async function () {
        try {
            await axios.delete('/psiconection/delete/', {
                data: { id: id }
            });
        } catch (error) {
            console.error('Error al eliminar:', error);
        }
    }
}

export const getAppointment = () => {
    return async function (dispatch) {
        try {
            const appointments = await axios.get('/psiconection/citas/reservarCita');
            const allAppointments = appointments.data;
            return dispatch({
                type: GET_APPOINTMENTS,
                payload: allAppointments
            })
        } catch (error) {
            console.log(error.message);
        }
    }
};
//----------------------------GUARDAR USUARIO LOGEADO----------------------------------//
export const loadCurrentUser = (dataUser) => {
    return function (dispatch) {
        try {
            console.log("Entra en la action de current user:" + dataUser) ;
            return dispatch({
                type: LOAD_CURRENT_USER,
                payload: dataUser
            })
        } catch (error) {
            console.log(error.message);
        }
    }
};

export const getAllPsicologos = () => {
    return async function (dispatch) {
        const apiData = await axios.get("/psiconection/");
        const psicologos = apiData.data;
        dispatch({ type: GET_ALL_PSICOLOGOS, payload: psicologos });
    };
}

//----------------------------eliminar psicologo----------------------------------//
export const deleteClient = (id) => {
    return async function () {
        try {
            await axios.delete('/psiconection/delete/user', {
                data: { id: id }
            });
        } catch (error) {
            console.error('Error al eliminar:', error);
        }
    }
}

//-----------------------obtener el detail del PSICOLO CON PROTECCION-----------------------------//

export const getDetailAuthPsicologo = (id) => {
    const getToken = window.localStorage.getItem('authToken')
    const tokenObject = JSON.parse(getToken); 

    return async function (dispatch) {
        try {
           const { data } = await axios.get(`/psiconection/acount/${id}`, {
            headers: {
              Authorization: `Bearer ${tokenObject}` // Agrega el token al encabezado de autorización
            }
          })
          const psicologo = data.psicologo         
         return dispatch(
            { type: GET_DETAIL_ACOUNT_PSICOLOGO , 
                payload: psicologo 
            });
        } catch (error) {
            console.log(error);
            return dispatch({
                    type: GET_DETAIL_ACOUNT_PSICOLOGO,
                    payload: error.response.data.error
                })
        }
    }
}

//-----------------------obtener el detail del PSICOLO CON PROTECCION CITAS-----------------------------//

export const getDetailAuthPsicologoCitas = (id) => {
    const getToken = window.localStorage.getItem('authToken')
    const tokenObject = JSON.parse(getToken); 

    return async function (dispatch) {
        try {
           const { data } = await axios.get(`/psiconection/acount/${id}`, {
            headers: {
              Authorization: `Bearer ${tokenObject}` // Agrega el token al encabezado de autorización
            }
          })
          const citas = data.cita         
         return dispatch(
            { type: GET_DETAIL_ACOUNT_PSICOLOGO_CITAS , 
                payload: citas 
            });
        } catch (error) {
            console.log(error);
            return dispatch({
                    type: GET_DETAIL_ACOUNT_PSICOLOGO_CITAS,
                    payload: error.response.data.error
                })
        }
    }
}

//-----------------------obtener el detail del cliente-----------------------------//
export const getDetailClient = (id) => {
    const getToken = window.localStorage.getItem('authToken')
    const tokenObject = JSON.parse(getToken);
    
     
    return async function (dispatch) {
        
        
        try {
            const apiData = await axios.get(`/psiconection/usuario/acount/${id}`, 
            {
                headers: {
                  Authorization: `Bearer ${tokenObject}` // Agrega el token al encabezado de autorización
                }
              });
            const cliente = apiData.data;
            console.log(cliente)
            return dispatch({
                type: GET_DETAIL_CLIENT,
                payload: cliente,
            });
        } catch (error) {
            console.log(error);
            return dispatch({
                type: GET_DETAIL_CLIENT,
                payload: error.response.data.error
            })
        }
    };
};

//-----------------------obtener el detail del cliente ADMIN-----------------------------//
export const getDetailClientAdmin = (id) => {
    const getToken = window.localStorage.getItem('authToken')
    const tokenObject = JSON.parse(getToken);
    return async function (dispatch) {
        try {
            const apiData = await axios.get(`/psiconection/usuario/acount/admin/${id}`, 
            {
                headers: {
                  Authorization: `Bearer ${tokenObject}` // Agrega el token al encabezado de autorización
                }
              });
              console.log("dataaa",apiData.data);
              
            const admin = apiData.data;
            console.log(admin)
            return dispatch({
                type: GET_DETAIL_ACOUNT_ADMIN,
                payload: admin,
            });
        } catch (error) {
            console.log(error);
            return dispatch({
                type: GET_DETAIL_ACOUNT_ADMIN,
                payload: error.response.data.error
            })
        }
    };
};

export const cancelCita = (IdCita) => {
    return async function () {
        const cita = {id : IdCita, estado: "cancelado"}
        await axios.put("/psiconection/citas/reservarCita", cita)
            .then(response => console.log(response))
            .catch(error => console.log("Error en la solicitud PUT", error));
    }
}

//-----------------------obtener el detail del USUARIO CON PROTECCION-----------------------------//

// export const getDetailAuthUSuario = (id) => {
//     const getToken = window.localStorage.getItem('authToken')
//     const tokenObject = JSON.parse(getToken); 

//     return async function (dispatch) {
//         try {
//            const { data } = await axios.get(`http://localhost:3001/psiconection/usuario/acount/${id}`, {
//             headers: {
//               Authorization: `Bearer ${tokenObject}` // Agrega el token al encabezado de autorización
//             }
//           })
//           const usuario = data.usuario         
//          return dispatch(
//             { type: GET_DETAIL_ACOUNT_PSICOLOGO , 
//                 payload: usuario 
//             });
//         } catch (error) {
//             console.log(error);
//             return dispatch({
//                     type: GET_DETAIL_ACOUNT_PSICOLOGO,
//                     payload: error.response.data.error
//                 })
//         }
//     }

// }


// export const setFilter = (filters) => {
//     //comentario
//     return { type: SET_FILTER, payload: filters }
// }

// export const setOrders = (order) => {
//     return { type: SET_ORDERS, payload: order }
// }
// //Action de get psicologos
// export const getPsicologos = () => {
//     return async function (dispatch) {
//             const apiData = await axios.get("http://localhost:3001/psiconection/");
//             const psicologos = apiData.data
//             dispatch({ type: GET_PSICOLOGOS, payload: psicologos })


//     }
// }//Action de get by ID
// export const loadDetail = (id) => {
//     return (async function (dispatch) {
//         try {
//             const { data } = await axios.get(`http://localhost:3001/psiconection/${id}`);
//             const detail = data
//             return (dispatch({
//                 type: LOAD_DETAIL, payload: detail
//             }))
//         } catch (error) {
//             console.log(error.message);

//         }
//     })
// }
// //action para buscar por name
// export const searchByName = (apellido) => {
//     return async function (dispatch) {
//         try {
//             const response = await axios.get(`http://localhost:3001/psiconection/?apellido=${apellido}`)
//             if (response.data.length === 0) {
//                 alert('Name not found!');
//             } else {
//                 return dispatch({
//                     type: 'SEARCH_APELLIDO',
//                     payload: response.data
//                 })
//             }
//         } catch (error) {
//             window.alert('Name not found!');
//         }
//     }
// }

// export const updatePsic = (dataToUpdate) => {
//     axios.put("http://localhost:3001/psiconection/update", dataToUpdate)
//         .then(response => {
//             window.alert("Datos actualizados!")
//         })
//         .catch(error => {
//             console.log("error")
//             // Manejar errores en caso de que la solicitud falle
//         });
// };