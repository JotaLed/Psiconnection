import { SET_FILTER, SET_ORDERS, GET_PSICOLOGOS } from "./actions";
import store from "./store";
const initialstate = {
  //Todos los psicologos
  allPshychologists: [],
  //Psicolos que se renderizan
  psychologists: [],
  psychoOrdered: []
}

const rootReducer = (state = initialstate, action) => {
  //Cuando se haga el GET PSY se debe hacer que tanto allPsy como psy contentgan todos los psicologos
  switch (action.type) {
    case SET_FILTER:
      let psyFiltered = [...state.psychoOrdered]

      const { genero, pais, horario, especialidad} = action.payload;

      if (genero !== "all") {
        psyFiltered = psyFiltered.filter((psychologist) => psychologist.genero.toLowerCase() === genero);
      }

      if (pais !== 'all') {
        psyFiltered = psyFiltered.filter((psychologist) => psychologist.pais.toLowerCase() === pais);
      }

      if (horario != 'all') {
        psyFiltered = psyFiltered.filter((psychologist) => psychologist.horario === horario)
      }

      if (especialidad!= "all") {
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
    case GET_PSICOLOGOS: 
      const psicologos = action.payload;
      const activos = psicologos.filter((psicologo) => psicologo.estado_cuenta.toLowerCase() === "activo")
      return {...state, psychologists: activos, allPshychologists: activos}
      
    default: return state
  }


}

export default rootReducer;