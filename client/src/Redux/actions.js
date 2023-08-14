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
import axios from "axios";

export const setFilter = (filters) => {
  //comentario
  return { type: SET_FILTER, payload: filters };
};

export const setOrders = (order) => {
  return { type: SET_ORDERS, payload: order };
};
//Action de get psicologos
export const getPsicologos = () => {
  return async function (dispatch) {
    const apiData = await axios.get("/psiconection/");
    const psicologos = apiData.data;
    dispatch({ type: GET_PSICOLOGOS, payload: psicologos });
  };
}; //Action de get by ID
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
//action para buscar por name
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
    await axios.put("/psiconection/update", dataToUpdate)
    .then(response => console.log(response))
    .catch(error => console.log("Error en la solicitud PUT", error));
  }
};

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

export const getDetailClient = (id) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`psiconection/usuario/acount/${id}`);
      const cliente = apiData.data;
      console.log(cliente)
      return dispatch({
        type: GET_DETAIL_CLIENT,
        payload: cliente,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const updateClient = (dataToUpdate)=> {
  return async function () {
    await axios.put("/psiconection/updateuser", dataToUpdate)
    .then(response => console.log(response))
    .catch(error => console.log("Error en la solicitud PUT", error));
  }
}

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

