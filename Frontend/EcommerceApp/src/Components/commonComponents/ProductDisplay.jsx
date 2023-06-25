import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Rating from './Rating'
import { useDispatch, useSelector } from "react-redux"
import { getProductById2 } from "../../Api/ProductApi/ProductApi"
import { Image, Button } from "react-bootstrap"
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import { toast } from "react-toastify"
import { insertProductIntoCart } from '../../ReduxStore/slices/cartSlice'
import ReviewModal from './ReviewModal'
import { USER_INFO } from '../../utils/constants'
import Cookie from 'js-cookie'
import ReviewCard from './ReviewCard'
import CustomCarousel from '../Home/CustomCarousel'
const ProductDisplay = () => {

    const { id } = useParams()
    const productData = useSelector(state => state.productData.productData)
    const [quantityCounter, setQuantityCounter] = React.useState(1)
    const [show, setShow] = React.useState(false)
    const user = Cookie.get(USER_INFO)
    const slider_options = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
    }
    const handleShow = () => {
        setShow(prev => !prev)
    }

    const dispatch = useDispatch()

    React.useEffect(() => {
        getProductById2(id, dispatch)
    }, [])

    const handlePlusCounter = () => {
        if (quantityCounter < productData.quantity) {
            setQuantityCounter(prev => prev + 1);
        } else {
            toast.warning("Quantity Exceeds")
        }
    }
    const handleMinusCounter = () => {
        if (quantityCounter > 1) {
            setQuantityCounter(prev => prev - 1)
        }
    }
    const addToCart = () => {

        let data = { ...productData }
        data.orderQuantity = quantityCounter
        dispatch(insertProductIntoCart(data))

    }


    const reviews = productData?.reviews.map((review) => {
        console.log(review)
        return (
            <ReviewCard
                profileImage = {review.profileImage}
                reviewBy = {review.reviewBy}
                ratingGiven = {review.ratingGiven}
                message = {review.reviewMessage}
            />
        )
    })
    return (
        <div className='my-container user-product-display '>
            {
                productData ?
                    <div className='d-flex flex-column  product-display-container'>
                        <div className='d-flex align-items-center product-holder justify-content-around '>
                            <div className='left d-flex align-items-center justify-content-center '>
                                <Image src={productData.image} alt={`${productData.name} image`} />
                            </div>

                            <div className='d-flex  flex-column right'>
                                <div className='titles m-b-20'>
                                    <h3>{productData.name}</h3>
                                    <p>{productData.category}</p>
                                    <Rating
                                        rating={productData.rating}
                                    />
                                </div>
                                <p className='m-b-20'>{productData.description}</p>
                                <div className='d-flex align-items-center justify-content-between m-b-20 product-info'>

                                    <div className='box'>
                                        <span>Price</span>
                                        <div>
                                            <span className='rupee-symbol'>&#8377;</span><span>{productData.price}</span>
                                        </div>
                                    </div>

                                    <div className='box'>
                                        <span>Quantity</span>
                                        <span>{productData.quantity}</span>
                                    </div>

                                    <div className='box'>
                                        <span>Ratings</span>
                                        <span>{productData.rating}</span>
                                    </div>

                                    <div className='box'>
                                        <span>Stutus</span>
                                        {
                                            productData.isAvailable ?
                                                <Button className="btn-success">Available</Button>
                                                :
                                                <Button className="btn-danger">Not Available</Button>
                                        }
                                    </div>
                                </div>

                                <div className='d-flex aling-items-center justify-content-between btn-section'>
                                    <div className='d-flex align-items-center quantity-counter'>
                                        <AiOutlinePlus onClick={handlePlusCounter} className='plus' />
                                        <span>{quantityCounter}</span>
                                        <AiOutlineMinus onClick={handleMinusCounter} className='minus' />
                                    </div>
                                    <Button className="add-to-cart" onClick={addToCart}>Add To Cart</Button>
                                </div>
                                {
                                    user ?
                                        <Button
                                            className='add-to-cart review-btn'
                                            onClick={handleShow}
                                        >
                                            Submit Review
                                        </Button>
                                        :
                                        <NavLink
                                            to={"/auth"}
                                            className="add-to-cart review-btn"
                                        >
                                            Submit Review
                                        </NavLink>
                                }
                            </div>
                        </div>
                        <div className='review-carousel'>
                            <h4>Reviews</h4>
                            <CustomCarousel
                                setting={slider_options}
                            >
                                {reviews}
                            </CustomCarousel>
                        </div>
                    </div>
                    :
                    <h1>Loading</h1>
            }
            <ReviewModal
                show={show}
                handleClose={handleShow}
                productId={id}
            />
        </div>
    )
}

export default ProductDisplay