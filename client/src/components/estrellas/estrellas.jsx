// StarRating.js
import React from 'react';
import style from "./estrellas.module.css"
const StarRating = ({ value }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= value ? style.marked : style.star}>
        ★
      </span>
    );
  }

  return <div>{stars}</div>;
};

export default StarRating;
