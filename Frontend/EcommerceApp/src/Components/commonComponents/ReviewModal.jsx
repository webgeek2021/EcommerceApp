import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import starEmpty from "../../assets/Images/EmptyStar.png";
import starFilled from "../../assets/Images/FullStar.png";
import { USER_INFO } from '../../utils/constants';
import {Cookie} from "js-cookie"

function ReviewModal(props) {

    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = () => {
        // Handle form submission, e.g., send the review data to the server
        console.log('Rating:', rating);
        console.log('Message:', message);
        // Reset the form fields
        setRating(0);
        setMessage('');
        // Close the modal or perform any other necessary actions
        const user = Cookie.get(USER_INFO)
        const reviewBy = user.name 
        const profileImage = user.profileImage
        const reviewMessage = message
        const rating = rating

        // api call for rating
        props.handleClose()
    };

    
    const renderStar = (value) => {
        const starImage = value <= rating ? starFilled : starEmpty;
        return <img src={starImage} alt="star" onClick={() => handleRatingChange(value)} />;
    };
    return (
        <>

            <Modal
                show={props.show}
                onHide={props.handleClose}
                animation={true}
                className='review-modal'
                size='sm'
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column align-items-center review-modal">
                        <div className="rating">
                            {renderStar(1)}
                            {renderStar(2)}
                            {renderStar(3)}
                            {renderStar(4)}
                            {renderStar(5)}
                        </div>
                        <textarea
                            placeholder="Write your review"
                            value={message}
                            onChange={handleMessageChange}
                            className='w-100 text-area'
                            rows={5}
                            required
                        ></textarea>
                        <Button className="add-to-cart" onClick={handleSubmit}>Submit</Button>
                    </div>
                </Modal.Body>
                
            </Modal>
        </>
    );
}

export default ReviewModal;