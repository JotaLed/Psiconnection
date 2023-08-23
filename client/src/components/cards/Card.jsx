import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import './Card.css';
import StarRating from '../estrellas/estrellas';


export default function Card(props) {
  function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  return (
    <Link to={`/detail/${props.id}`}>
      <div className="card" style={{ width: '22rem' }}> 
        <img className="card-img-top" src={props.imagen} alt="Card image cap" style={{ height: '25rem', objectFit: 'cover', objectPosition: 'center top'  }} />
        <div className="card-body">
          <h3 className="card-title">{capitalizeFirstLetter(props.nombre) +" " + capitalizeFirstLetter(props.apellido)}</h3>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Valoración:   <StarRating value={props.valoracion}/></li>
          <li className="list-group-item">
  <span className="item-label">Tarifa: </span>
  <span>${props.tarifa} dólares por sesión.</span>
</li>
        </ul>
      </div>
    </Link>
  );
}


// import { Link } from 'react-router-dom';

// import React from 'react';
// import s from "./Card.module.css";
// import StarRating from '../estrellas/estrellas';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function Cards(props) {

//   function capitalizeFirstLetter(name) {
//     return name.charAt(0).toUpperCase() + name.slice(1);
// }
//   return (
//     <Link to={`/detail/${props.id}`}>
//       {/* <div className={s.cartaPrueba}>
//         <h1>carta</h1>
//       </div> */}
//     <div className={`card ${s.carta}`}>
      
//       <img className="card-img-top" src={props.imagen} alt="Card image cap" style={{ height: '20rem'}}/>

     
//       <div className="card-body">
//         <h3 className={s.titulo}>{capitalizeFirstLetter(props.nombre) +" " + capitalizeFirstLetter(props.apellido)}</h3>
//       </div>
//       <ul className="list-group list-group-flush">
//     <li className="list-group-item"><StarRating value={props.valoracion}/></li>
//     <li className="list-group-item">${props.tarifa}</li>
//   </ul>
//     </div>
 
//     {/* <div className={s.ayuda}>
//     <img className='imagen' src={props.imagen} alt={props.nombre} style={{height: '20rem', width: '250px'}}/>

//     </div> */}
//     </Link>
//   );
// }
