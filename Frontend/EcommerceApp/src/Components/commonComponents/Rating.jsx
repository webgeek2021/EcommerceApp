import React from 'react';
import FullStar from "../../assets/Images/FullStar.png";
import HlafStar from "../../assets/Images/halfStar.png";
import EmptyStar from "../../assets/Images/EmptyStar.png";
import { Image } from 'react-bootstrap'; 
const Rating = ({ rating, onChange }) => {

  const handleClick = (newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  const filledStars = Math.floor(rating); // Get the integer part of the rating
  const hasHalfStar = rating - filledStars >= 0.5; // Check if there's a half-star

  return (
    <div className='rating_container'>
      {[1, 2, 3, 4, 5].map((star) => {
        let starIcon = <Image src={`${EmptyStar}`} alt=""/>; // Default empty star

        if (star <= filledStars) {
          starIcon = <Image src={`${FullStar}`} alt=""/>; // Filled star
        } else if (hasHalfStar && star === filledStars + 1) {
          starIcon = <Image src={`${HlafStar}`} alt=""/>; // Half-star
        }

        return (
          <span
            key={star}
            onClick={() => handleClick(star)}
            style={{ cursor: 'pointer' }}
            className='stars'
          >
            {starIcon}
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
