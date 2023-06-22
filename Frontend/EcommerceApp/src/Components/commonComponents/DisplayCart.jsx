
import React from 'react'
import { Dropdown, Offcanvas, Image ,Button} from 'react-bootstrap';
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from '../../Api/ProductApi/ProductApi';
import { setShowCart } from '../../ReduxStore/slices/cartSlice';
import logo from "../../assets/Icons/logo.svg";
import CartCard from './CartCard';
import {RemoveAll} from "../../ReduxStore/slices/cartSlice";
import { useNavigate } from 'react-router-dom';
import { CART } from '../../utils/constants';
const DisplayCart = (props) => {


    const data = useSelector(state => state.cart.productList)
    const cartTotal = useSelector(state => state.cart.total)
    const show = useSelector(state => state.cart.showCart)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    // React.useEffect(() => {
    //     if (productIds.length > 0) {
    //         productIds.map((obj) => {
    //             getProductList(obj.id, dispatch, obj.quantityPurchase)
    //         })
    //     }
    //     console.log(productIds)
    // }, [productIds])
    const handleClose = () => {
        dispatch(setShowCart())
    }

    const handlePayment  = () =>{
        handleClose()
       navigate("/billing")
    }

    const list = data?.map((prod) => {
        return (
            <CartCard
                name={prod.name}
                category={prod.category}
                id={prod.id}
                price={prod.price}
                orderQuantity={prod.orderQuantity}
                image={prod.image}
                quantity={prod.quantity}
            />
        )
    })

    return (
        <Offcanvas
            show={show}
            onHide={handleClose}
            placement='start'
            className="display-cart-container"
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    <Image src={logo} />
                    <Button className='remove-all' onClick={() => dispatch(RemoveAll())}>Remove All</Button>
                </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
                {
                    list.length > 0 ?
                        <div className='cart-items'>
                            {list}
                            <div className='total'>
                                Total : <span className='rupee-symbol'>&#8377;</span> {cartTotal}
                            </div>
                            <Button className='add-to-cart' onClick={handlePayment}>Place Order</Button>
                        </div>
                        :
                        <div className='cart-empty'>
                            <h5>cart is Empty </h5>
                        </div>
                }
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default DisplayCart