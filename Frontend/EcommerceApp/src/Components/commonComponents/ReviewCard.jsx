import React from 'react'
import { Image } from "react-bootstrap"
import BackGroundImage from "../../assets/Images/reviewCardBackground.svg";
import userImage from "../../assets/Icons/user.jpg"
import Rating from './Rating';
const ReviewCard = (props) => {
    return (
        <div className='d-flex flex-column reviewCard'>
            <div className='upper '>
                <Image src={BackGroundImage} alt="" className='background-image'/>
                <Image src={props.profileImage || userImage} alt="" className='profile-image' />
            </div>
            <div className='lower d-flex flex-column align-items-center'>
                <Rating
                    rating={props.ratingGiven}
                />
                <p className='name'>{props.reviewBy}</p>
                <p className='message'>{props.message}</p>
            </div>
        </div>
    )
}

export default ReviewCard