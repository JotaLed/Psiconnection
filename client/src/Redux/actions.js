export const SET_FILTER = "SET_FILTER";
export const SET_ORDERS = "SET_ORDERS";
export const GET_PSICOLOGOS = "GET_PSICOLOGOS";
export const LOAD_DETAIL = "LOAD_DETAIL"
export const SEARCH_APELLIDO = "SEARCH_APELLIDO"
export const UPDATE_PSIC = "UPDATE_PSIC";
export const GET_SPECIALITIES = "GET_SPECIALITIES"
export const GET_DETAIL= "GET_DETAIL"
import axios from "axios"

export const setFilter = (filters) => {
    //comentario
    return { type: SET_FILTER, payload: filters }
}

export const setOrders = (order) => {
    return { type: SET_ORDERS, payload: order }
}
//Action de get psicologos
export const getPsicologos = () => {
    return async function (dispatch) {
            const apiData = await axios.get("http://localhost:3001/psiconection/");
            const psicologos = apiData.data
           dispatch({ type: GET_PSICOLOGOS, payload: psicologos })
        

    }
}//Action de get by ID
export const loadDetail = (id) => {
    return (async function (dispatch) {
        try {
            const { data } = await axios.get(`http://localhost:3001/psiconection/${id}`);
            const detail = data
            return (dispatch({
                type: LOAD_DETAIL, payload: detail
            }))
        } catch (error) {
            console.log(error.message);

        }
    })
}
//action para buscar por name
export const searchByName = (apellido) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/psiconection/?apellido=${apellido}`)
            if (response.data.length === 0) {
                alert('Name not found!');
            } else {
                return dispatch({
                    type: 'SEARCH_APELLIDO',
                    payload: response.data
                })
            }
        } catch (error) {
            window.alert('Name not found!');
        }
    }
}

export const updatePsic = (dataToUpdate) => {

    return async function (){
        axios.put("http://localhost:3001/psiconection/update", dataToUpdate)
    }

}

export const getSpecialities = () => {
    return async function (dispatch) {
        try {
            const apiData= await axios.get(`http://localhost:3001/psiconection/specialties`);
            const especialidades = apiData.data
            return (dispatch({
                type: GET_SPECIALITIES, payload: especialidades
            }))
        } catch (error) {
            console.log(error.message);

        }
    }
}

export const getDetail = (id) => {
    return async function (dispatch) {
        try {
            const apiData= await axios.get(`http://localhost:3001/psiconection/acount/${id}`);
            const psicologo = apiData.data
            console.log(psicologo)
            return (dispatch({
                type: GET_DETAIL, payload: psicologo
            }))
        } catch (error) {
            console.log(error.message);

        }
    }
}