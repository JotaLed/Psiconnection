import { SET_FILTER, SET_ORDERS, GET_PSICOLOGOS, LOAD_DETAIL, SEARCH_APELLIDO, GET_SPECIALITIES, GET_DETAIL, GET_DETAIL_CLIENT, GET_APPOINTMENTS, LOAD_CURRENT_USER, GET_USERS, GET_ALL_PSICOLOGOS, GET_DETAIL_ACOUNT_PSICOLOGO, GET_DETAIL_ACOUNT_ADMIN, GET_DETAIL_ACOUNT_PSICOLOGO_CITAS } from "./actions";
import store from "./store";
const initialstate = {
  //Todos los psicologos
  allPshychologists: [],
  //todos los usuarios
  allUsers:[],
  //Psicolos que se renderizan
  psicoloDetail: {},
  psychologists: [],
  psychoOrdered: [],
  especialidades: [],
  psicologo: {},
  cliente: [],
  appointments: [],
  currentUser: {},
  adminPsicologos: [],
  psicologoDetailAcount:{},
  usuarioAcountAdmin: {},
  citasPsicologo: []
}

const rootReducer = (state = initialstate, action) => {
  //Cuando se haga el GET PSY se debe hacer que tanto allPsy como psy contentgan todos los psicologos
  switch (action.type) {

    case SET_FILTER:
      let psyFiltered = [...state.psychoOrdered]

      const { genero, pais, horario, especialidad } = action.payload;

      if (genero !== "all") {
        psyFiltered = psyFiltered.filter((psychologist) => psychologist.genero.toLowerCase() === genero);
      }

      if (pais !== 'all') {
        psyFiltered = psyFiltered.filter((psychologist) => psychologist.pais.toLowerCase() === pais);
      }

      if (horario != 'all') {
        psyFiltered = psyFiltered.filter((psychologist) => psychologist.horario === horario)
      }

      if (especialidad != "all") {
        console.log(especialidad)
        psyFiltered = psyFiltered.filter((psychologist) => psychologist.especialidad.includes(especialidad))
      }
      console.log(psyFiltered)
      //se puede poner un alert si no se encuentrar resultados
      return { ...state, psychologists: psyFiltered }

    case SET_ORDERS:

      const order = action.payload;
      let psyOrdered = [...state.psychologists];
      let allOrdered = [...state.allPshychologists];

      switch (order) {
        case "desPr":
          psyOrdered.sort((a, b) => a.tarifa - b.tarifa);
          allOrdered.sort((a, b) => a.tarifa - b.tarifa);
          break;
        case "ascPr":
          psyOrdered.sort((a, b) => b.tarifa - a.tarifa);
          allOrdered.sort((a, b) => b.tarifa - a.tarifa);
          break;
        case "desPu":
          psyOrdered.sort((a, b) => {
            if (a.valoracion === undefined && b.valoracion === undefined) {
              return 0; // Ambos elementos no tienen puntuación, no hay cambio en el orden
            } else if (a.valoracion === undefined) {
              return 1; // El elemento 'a' no tiene puntuación, lo colocamos al final
            } else if (b.valoracion === undefined) {
              return -1; // El elemento 'b' no tiene puntuación, lo colocamos al final
            } else {
              return b.valoracion - a.valoracion; // Ambos elementos tienen puntuación, orden normal
            }
          });
          allOrdered.sort((a, b) => {
            if (a.valoracion === undefined && b.valoracion === undefined) {
              return 0; // Ambos elementos no tienen puntuación, no hay cambio en el orden
            } else if (a.valoracion === undefined) {
              return 1; // El elemento 'a' no tiene puntuación, lo colocamos al final
            } else if (b.valoracion === undefined) {
              return -1; // El elemento 'b' no tiene puntuación, lo colocamos al final
            } else {
              return b.valoracion - a.valoracion; // Ambos elementos tienen puntuación, orden normal
            }
          });
          break;

        case "desPu":
          psyOrdered.sort((a, b) => {
            if (a.valoracion === undefined && b.valoracion === undefined) {
              return 0; // Ambos elementos no tienen puntuación, no hay cambio en el orden
            } else if (a.valoracion === undefined) {
              return 1; // El elemento 'a' no tiene puntuación, lo colocamos al final
            } else if (b.valoracion === undefined) {
              return -1; // El elemento 'b' no tiene puntuación, lo colocamos al final
            } else {
              return b.valoracion - a.valoracion; // Ambos elementos tienen puntuación, orden normal
            }
          });
          allOrdered.sort((a, b) => {
            if (a.valoracion === undefined && b.valoracion === undefined) {
              return 0; // Ambos elementos no tienen puntuación, no hay cambio en el orden
            } else if (a.valoracion === undefined) {
              return 1; // El elemento 'a' no tiene puntuación, lo colocamos al final
            } else if (b.valoracion === undefined) {
              return -1; // El elemento 'b' no tiene puntuación, lo colocamos al final
            } else {
              return b.valoracion - a.valoracion; // Ambos elementos tienen puntuación, orden normal
            }
          });
          break;
        case "alf":
          psyOrdered.sort((a, b) => a.nombre.localeCompare(b.nombre));
          allOrdered.sort((a, b) => a.nombre.localeCompare(b.nombre));
          break;
        default:
          break;
      }


      return { ...state, psychologists: psyOrdered, psychoOrdered: allOrdered };

    case LOAD_DETAIL:
      return { ...state, psicoloDetail: action.payload }

    case GET_PSICOLOGOS:
        const psicologos = action.payload;
        const activos = psicologos.filter((psicologo) => psicologo.estado_cuenta.toLowerCase() === "activo")
        if(activos.length === 0){
          alert('no hay psicos')
        }
        return { ...state, psychologists: activos, allPshychologists: activos }
    
    case GET_USERS:
        const users = action.payload;
        const noAdmins = users.filter((user) => user.roll.toLowerCase() === "usuario")

        return { ...state, allUsers: noAdmins}  
    

    case SEARCH_APELLIDO:
      const activo = action.payload?.filter((element) => element.estado_cuenta.toLowerCase() === "activo")
      return {
        ...state,
        psychologists: activo,
      };

    case GET_SPECIALITIES:
      return {
        ...state,
        especialidades: action.payload.map((element) => element.especialidad)
      }

    case GET_DETAIL:
      return {
        ...state,
        psicologo: action.payload
      }

    case GET_DETAIL_CLIENT:
      return {
        ...state,
        cliente: action.payload
      }

    case GET_APPOINTMENTS:
      return {
        ...state, appointments: action.payload
      }
    case LOAD_CURRENT_USER:
      return {
        ...state, currentUser: action.payload
      }
    
    case GET_ALL_PSICOLOGOS:
      return{
        ...state, adminPsicologos: action.payload
      }

    case GET_DETAIL_ACOUNT_PSICOLOGO: 
    return {
      ...state, psicologoDetailAcount: action.payload
    }

    case GET_DETAIL_ACOUNT_ADMIN: 
    return {
      ...state, usuarioAcountAdmin: action.payload
    }

    case GET_DETAIL_ACOUNT_PSICOLOGO_CITAS: 
    return {
      ...state, citasPsicologo: action.payload
    }
    
    default: return state
  }


}

export default rootReducer;