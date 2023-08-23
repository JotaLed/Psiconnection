import axios from "axios";
import { useState } from "react";
import Rate from "./Rate";


const Rating = ({ id }) => {
    const [rating, setRating] = useState(0);
   
    const showRate = async (rate) => {
    //   setRating(rate);
      await axios.put(`/psiconection/${id}`, { rating: rate });
    };
    
    
  
    return (
      <div>
        <div className="row">
          <div className="col text-center">
            <h2>Rate me</h2>
            <Rate rating={rating} onRating={(rate) => showRate(rate)} />
          </div>
        </div>
      </div>
    );
  };
  
  export default Rating;