export const SET_FILTER = "SET_FILTER";
export const SET_ORDERS = "SET_ORDERS";
export const GET_PSICOLOGOS = "GET_PSICOLOGOS"
import axios from "axios"

export const setFilter = (filters) => {
    //comentario
    return {type: SET_FILTER, payload: filters}
}

export const setOrders = (order) => {
    return {type: SET_ORDERS, payload: order}
}

export const getPsicologos =  () => {
    return async function (dispatch) {
        const apiData = await axios.get("http://localhost:3001/psiconection/");
        const psicologos = apiData.data

        dispatch({ type: GET_PSICOLOGOS, payload: psicologos})
    }
}