import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import s from "./Card.module.css";
import StarRating from '../estrellas/estrellas';
import { Link } from 'react-router-dom';

export default function Cards(props) {
  return (
    <Link to={`/detail/${props.id}`}>
      {/* <div className={s.cartaPrueba}>
        <h1>carta</h1>
      </div> */}
    <div className={`card ${s.carta}`}>
      
      <img className="card-img-top" src={props.imagen} alt="Card image cap" style={{ height: '20rem'}}/>

     
      <div className="card-body">
        <h3 className={s.titulo}>{props.nombre}</h3>
      </div>
      <ul className="list-group list-group-flush">
    <li className="list-group-item"><StarRating value={props.valoracion}/></li>
    <li className="list-group-item">${props.tarifa}</li>
  </ul>
    </div>
    {/* <div className={s.ayuda}>
    <img className='imagen' src={props.imagen} alt={props.nombre} style={{height: '20rem', width: '250px'}}/>

    </div> */}
    </Link>
  );
}
