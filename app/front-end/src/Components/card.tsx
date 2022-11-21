import React from "react";
import { Link } from 'react-router-dom'
interface ICard {
  imgUrl: string;
  imgAlt: string;
  cardText: string;
}

function Card({ imgUrl, imgAlt, cardText}: ICard) {
  return (
    <Link className="card_link" to={'/user/pix'}>
      <div className="card_body">
        <img src={ imgUrl } alt={ imgAlt } className="card_img"/>
        <h3 className="card_text">{ cardText }</h3>
      </div>
    </Link>
  )
}

export default Card;
