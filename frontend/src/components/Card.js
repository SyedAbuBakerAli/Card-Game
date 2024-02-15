// src/components/Card.js
import React, { useState }  from 'react';

const Card = ({card,handleFlip} ) => {
  const [flipped, setFlipped] = useState(false);
  

  const handleClick = () => {
    setFlipped(!flipped);
    handleFlip(card);
  };

  return (
   <div className='card_image' onClick={handleClick}>
      {flipped ? (
        <img className="circle-img" src={card.imageURL} alt='card front'/>
      ) : (
        <img className="circle-img" src="/images/cover.jpg" alt='card back'/>
      )}
    </div>
  );
};

export default Card;
