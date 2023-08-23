import axios from "axios";
import { useState } from "react";
import Rate from "./Rate";
//importamos estilo 
import s from "../starRating/Rating.module.css"



const Rating = ({ id }) => {
    const [rating, setRating] = useState(0);
   
    const showRate = async (rate) => {
    //   setRating(rate);
      await axios.put(`/psiconection/${id}`, { rating: rate });
    };
    
    
  
    return (
      <div className={s.rating}>
        <div className="row">
          <div className="col text-center">
            <h2>Puntuame</h2>
            <Rate rating={rating} onRating={(rate) => showRate(rate)} />
          </div>
        </div>
      </div>
    );
  };
  
  export default Rating;