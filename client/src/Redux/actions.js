export const SET_FILTER = "SET_FILTER";
export const SET_ORDERS = "SET_ORDERS";
export const GET_PSICOLOGOS = "GET_PSICOLOGOS";
export const LOAD_DETAIL = "LOAD_DETAIL"
export const SEARCH_NAME = "SEARCH_NAME"
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
    return( async function (dispatch) {
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
export const searchByName = (name) =>{
    return async function(dispatch) {
        try{
            const response = await axios.get(`http://localhost:3001/psiconection/?name=${name}`)
            return dispatch({
                type:'SEARCH_NAME',
                payload :response.data
            });
        } catch(error){
            window.alert('Name not found!');
        }
    }
}