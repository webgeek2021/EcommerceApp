import React from 'react'
import { Image, Button } from "react-bootstrap"
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import {toast} from "react-toastify"
import {deleteFromCart} from "../../ReduxStore/slices/cartSlice";
import { useDispatch } from 'react-redux'
const CartCard = (props) => {

    const [quantityCounter, setQuantityCounter] = React.useState(props.orderQuantity)
    const dispatch = useDispatch()
    const handlePlusCounter = () => {
        if (quantityCounter < props.quantity) {
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
    const handleDelete = ()=>{
        dispatch(deleteFromCart(props.id))
    }
    return (
        <div className='d-flex justify-content-between flex-column cart-cart-container'>
            <Link to={`/show/product/${props.id}`} className='info-container'>
                <Image src={props.image} alt="" className='product-image' />
                <div className='product-info'>
                    <h5 className='name'>{props.name}</h5>
                    <p className='category'>{props.category}</p>
                </div>
            </Link>
            <div className='d-flex align-items-center justify-content-between btn-section'>
                    <div className='d-flex align-items-center quantity-counter'>
                        <AiOutlinePlus onClick={handlePlusCounter} className='plus' />
                        <span>{quantityCounter}</span>
                        <AiOutlineMinus onClick={handleMinusCounter} className='minus' />
                    </div>
                <Button className='btn-danger' onClick={handleDelete}>
                    <AiOutlineDelete />
                </Button>
            </div>
        </div>
    )
}

export default CartCard