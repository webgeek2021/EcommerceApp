import React from 'react'
import { Image, Button } from "react-bootstrap"
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify"
import { deleteFromCart } from "../../ReduxStore/slices/cartSlice";
import { useDispatch } from 'react-redux'
import DeleteCartItemConfirmation from './DeleteCartItemConfirmation'
const CartCard = (props) => {

    const dispatch = useDispatch()
    const [showConfirmation, setDeleteConfirmation] = React.useState(false)
    const handleDelete = () => {

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
                {/* <div className='d-flex align-items-center quantity-counter'>
                        <AiOutlinePlus onClick={()=>dispatch(handlePlus(props.id))} className='plus' />
                        <span>{quantityCounter}</span>
                        <AiOutlineMinus onClick={handleMinusCounter} className='minus' />
                    </div> */}
                <div>
                    Quantity Purchase : {props.orderQuantity}
                </div>
                <div>
                    Price : <span className='rupee-symbol'>&#8377;</span> {props.price}
                </div>
                <Button className='btn-danger' onClick={()=>setDeleteConfirmation(prev => !prev)}>
                    <AiOutlineDelete />
                </Button>
            </div>
            {
                showConfirmation &&
                <DeleteCartItemConfirmation
                    show={showConfirmation}
                    handleShow={setDeleteConfirmation}
                    name={props.name}
                    id={props.id}
                />
            }
        </div>
    )
}

export default CartCard