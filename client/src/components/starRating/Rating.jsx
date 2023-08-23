import axios from "axios";
import { useState } from "react";
import Rate from "./Rate";
import { toast, ToastContainer } from "react-toastify"; // Importamos componentes de react-toastify
import "react-toastify/dist/ReactToastify.css"; // Importamos el CSS de react-toastify
//importamos estilo 
import s from "../starRating/Rating.module.css"



const Rating = ({ id }) => {
  const [rating, setRating] = useState(0);

  const showRate = async (rate) => {
    try {
      await axios.put(`/psiconection/${id}`, { rating: rate });
      toast.success('¡Puntuación registrada exitosamente!');
    } catch (error) {
      toast.error('Hubo un error al registrar la puntuación.');
    }
  }



  return (
    <div className={s.rating}>
      <div className="row">
        <div className="col text-center">
          <h2>Puntuame</h2>
          <Rate rating={rating} onRating={(rate) => {
            showRate(rate)
          }} />
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Rating;