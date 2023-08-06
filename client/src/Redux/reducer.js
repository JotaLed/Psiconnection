import { SET_FILTER, SET_ORDERS, GET_PSICOLOGOS } from "./actions";
import store from "./store";
const initialstate = {
  //Todos los psicologos
  allPshychologists: [
    {
      id: 1,
      nombre: "Alice  ",
      edad: 35,
      genero: "female",
      pais: "Mexico",
      horario: "AM",
      tarifa: 100,
      valoracion: 5,
      especializacion: "terapia familiar",
      imagen: "https://i.pinimg.com/564x/89/e2/c8/89e2c87aa9cf710d61c8f2badcf83f24.jpg"
    },
    {
      id: 2,
      nombre: "Bob",
      edad: 40,
      genero: "male",
      pais: "Argentina",
      horario: "PM",
      tarifa: 899,
      especializacion: "terapia de pareja",
      imagen: "https://i.pinimg.com/564x/6e/a9/d3/6ea9d3a86db7a28dce962115aaf815db.jpg"

    },
    {
      id: 3,
      nombre: "Carol",
      edad: 28,
      genero: "female",
      pais: "Colombia",
      horario: "AM",
      tarifa: 32,
      valoracion: 2,
      especializacion: "terapia de pareja",
      imagen: "https://i.pinimg.com/564x/fc/af/a2/fcafa2726cf6f9a2ae6743a629e3e141.jpg"

    },
    {
      id: 4,
      nombre: "David",
      edad: 45,
      genero: "male",
      pais: "Colombia",
      horario: "AM",
      tarifa: 124,
      valoracion: 5,
      especializacion: "terapia psicoanalitica",
      imagen: "https://i.pinimg.com/564x/90/c0/51/90c051810494297069df2b6b9a450c15.jpg",

    },
    {
      id: 5,
      nombre: "Eva",
      edad: 32,
      genero: "female",
      pais: "Mexico",
      horario: "PM",
      tarifa: 444,
      valoracion: 1,
      especializacion: "terapia de pareja",
      imagen: "https://i.pinimg.com/564x/1a/49/ac/1a49ac84e154f6769f537321908ce0fb.jpg"

    },
    {
      id: 6,
      nombre: "Frank",
      edad: 50,
      genero: "male",
      pais: "Argentina",
      horario: "AM",
      tarifa: 981,
      especializacion: "terapia familiar",
      imagen: "https://i.pinimg.com/564x/5e/64/cd/5e64cd5be6e7c1e0b0f7046c6949375a.jpg"

    },
    {

      id: 7,
      nombre: "Grace",
      edad: 29,
      genero: "female",
      pais: "Venezuela",
      horario: "PM",
      tarifa: 333,
      valoracion: 3,
      especializacion: "terapia de pareja",
      imagen: "https://i.pinimg.com/564x/8d/ad/10/8dad10816fe5a65453a0fdb8946fcd7b.jpg"

    },
    {
      id: 8,
      nombre: "Henry",
      edad: 38,
      genero: "male",
      pais: "Colombia",
      horario: "PM",
      tarifa: 555,
      valoracion: 4,
      especializacion: "terapia psicoanalitica",
      imagen: "https://assets.soyhenry.com/logoOG.png"
    },
  ],
  //Psicolos que se renderizan
  psychologists: [
    {
      id: 1,
      nombre: "Alice  ",
      edad: 35,
      genero: "female",
      pais: "Mexico",
      horario: "AM",
      tarifa: 100,
      valoracion: 5,
      especializacion: "terapia familiar",
      imagen: "https://i.pinimg.com/564x/89/e2/c8/89e2c87aa9cf710d61c8f2badcf83f24.jpg"
    },
    {
      id: 2,
     
      nombre: "Bob",
      edad: 40,
      genero: "male",
      pais: "Argentina",
      horario: "PM",
      tarifa: 899,
      especializacion: "terapia de pareja",
      imagen: "https://i.pinimg.com/564x/6e/a9/d3/6ea9d3a86db7a28dce962115aaf815db.jpg"

    },
    {
      id: 3,
      nombre: "Carol",
      edad: 28,
      genero: "female",
      pais: "Colombia",
      horario: "AM",
      tarifa: 32,
      valoracion: 2,
      especializacion: "terapia de pareja",
      imagen: "https://i.pinimg.com/564x/fc/af/a2/fcafa2726cf6f9a2ae6743a629e3e141.jpg"

    },
    {
      id: 4,
      nombre: "David",
      edad: 45,
      genero: "male",
      pais: "Colombia",
      horario: "AM",
      tarifa: 124,
      valoracion: 5,
      especializacion: "terapia psicoanalitica",
      imagen: "https://i.pinimg.com/564x/90/c0/51/90c051810494297069df2b6b9a450c15.jpg",

    },
    {
      id: 5,
      nombre: "Eva",
      edad: 32,
      genero: "female",
      pais: "Mexico",
      horario: "PM",
      tarifa: 444,
      valoracion: 1,
      especializacion: "terapia de pareja",
      imagen: "https://i.pinimg.com/564x/1a/49/ac/1a49ac84e154f6769f537321908ce0fb.jpg"

    },
    {
      id: 6,
      nombre: "Frank",
      edad: 50,
      genero: "male",
      pais: "Argentina",
      horario: "AM",
      tarifa: 981,
      especializacion: "terapia familiar",
      imagen: "https://i.pinimg.com/564x/5e/64/cd/5e64cd5be6e7c1e0b0f7046c6949375a.jpg"

    },
    {

      id: 7,
      nombre: "Grace",
      edad: 29,
      genero: "female",
      pais: "Venezuela",
      horario: "PM",
      tarifa: 333,
      valoracion: 3,
      especializacion: "terapia de pareja",
      imagen: "https://i.pinimg.com/564x/8d/ad/10/8dad10816fe5a65453a0fdb8946fcd7b.jpg"

    },
    {
      id: 8,
      nombre: "Henry",
      edad: 38,
      genero: "male",
      pais: "Colombia",
      horario: "PM",
      tarifa: 555,
      valoracion: 4,
      especializacion: "terapia psicoanalitica",
      imagen: "https://assets.soyhenry.com/logoOG.png"
    },
  ],

  psychoOrdered: []
}

const rootReducer = (state = initialstate, action) => {
  //Cuando se haga el GET PSY se debe hacer que tanto allPsy como psy contentgan todos los psicologos
  switch (action.type) {
    case SET_FILTER:
      let psyFiltered = [...state.psychoOrdered]

      const { genero, pais, horario, especializacion } = action.payload;

      if (genero !== "all") {
        psyFiltered = psyFiltered.filter((psychologist) => psychologist.genero === genero);
      }

      if (pais !== 'all') {
        psyFiltered = psyFiltered.filter((psychologist) => psychologist.pais.toLowerCase() === pais);
      }

      if (horario != 'all') {
        psyFiltered = psyFiltered.filter((psychologist) => psychologist.horario === horario)
      }

      if (especializacion != "all") {
        psyFiltered = psyFiltered.filter((psychologist) => psychologist.especializacion.toLowerCase() === especializacion)
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

      console.log(psyOrdered);

      return { ...state, psychologists: psyOrdered, psychoOrdered: allOrdered };
    case GET_PSICOLOGOS: 
      return {...state, psychologists: action.payload, allPshychologists:action.payload}
      
    default: return state
  }


}

export default rootReducer;