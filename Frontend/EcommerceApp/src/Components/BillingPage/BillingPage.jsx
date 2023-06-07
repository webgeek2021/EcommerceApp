import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartCard from '../commonComponents/CartCard'
import { getShippingDetails } from "../../Api/UserApi/UserApi";
import Cookie from 'js-cookie';
import { USER_INFO } from '../../utils/constants';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {placeOrder} from "../../Api/OrderApi/orderApi";
const BillingPage = () => {
    const productArr = useSelector(state => state.cart.productList)
    const cartTotal = useSelector(state => state.cart.total)
    const [shippingDetails, setShippingDetails] = React.useState()
    const [user , setUser] = React.useState()
    React.useEffect(() => {
        // api call for getting shipping details
        const data = JSON.parse(Cookie.get(USER_INFO))
        if (data) {
            const email = data.email
            setUser(data)
            getShippingDetails(email, setShippingDetails)

        }
    }, [])

    const product_list = productArr?.map((prod) => {
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

    const handlePayment = ()=>{
        let orderList = []

        productArr.map((item)=>{
            const obj = {
                name : item.name,
                orderQuantity : item.orderQuantity,
                price : item.price,
                image : item.image,
                productId : item.id
            }
            orderList.push(obj)
        })
        const data = {
            userEmail : user.email,
            userId : shippingDetails.userId,
            shippingId : shippingDetails.id,
            totalAmount : cartTotal,
            orderList : orderList
        }

        placeOrder(data)

    }

    return (
        <div className='my-container '>
            <div className='d-flex billing_page'>
                <div className='show-order'>
                    {/* display product */}
                    {product_list}
                </div>
                <div className='d-flex align-items-center flex-column show-shipping-details'>
                    <h5>Shipping Detail</h5>
                    {
                        shippingDetails ?
                            <div className='shipping-detail'>
                                <ul >
                                    <li >
                                        <div className='title'>City</div>
                                        <div className='value'>{shippingDetails.city}</div>
                                    </li>
                                    <li>
                                        <div className='title'>State</div>
                                        <div className='value'>{shippingDetails.state}</div>
                                    </li>
                                    <li>
                                        <div className='title'>PostalCode</div>
                                        <div className='value'>{shippingDetails.postalCode}</div>
                                    </li>
                                    <li>
                                        <div className='title'>Country</div>
                                        <div className='value'>{shippingDetails.country}</div>
                                    </li>
                                    <li>
                                        <div className='title'>Address</div>
                                        <div className='value'>{shippingDetails.address}</div>
                                    </li>
                                </ul>


                                <div className='d-flex w-100 justify-content-around btn-section'>
                                    <NavLink
                                        to="/profile/shippingDetails"
                                        className="nav-link add-to-cart"
                                    >
                                        Update Shipping Details
                                    </NavLink>

                                    <Button 
                                        className='nav-link add-to-cart'
                                        onClick={handlePayment}
                                    >
                                        Proceed To Payment
                                    </Button>
                                </div>

                            </div>

                            : <h1>Loading</h1>
                    }
                </div>
            </div>
        </div>
    )
}

export default BillingPage