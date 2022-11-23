import React from "react";
import { Link } from 'react-router-dom'
interface ICard {
  imgUrl?: string;
  imgAlt?: string;
  cardText: string;
  cardInsideText?: string
  imgTrue: boolean;
  cardClass?: string;
}

function Card({ imgUrl, imgAlt, cardText, cardInsideText, imgTrue, cardClass}: ICard) {
  return (
    <Link className="card_link" to={'/user/pix'}>
      <div className={ cardClass }>
        {imgTrue ? <img src={ imgUrl } alt={ imgAlt } className="card_img"/> : null}
        <h1 className="card_img">{ cardInsideText }</h1>
        <h3 className="card_text">{ cardText }</h3>
      </div>
    </Link>
  )
}

export default Card;
