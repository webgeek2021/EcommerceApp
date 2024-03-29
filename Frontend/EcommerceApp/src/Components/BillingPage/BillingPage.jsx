import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartCard from '../commonComponents/CartCard'
import { getShippingDetails } from "../../Api/UserApi/UserApi";
import Cookie from 'js-cookie';
import { USER_INFO, CART } from '../../utils/constants';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { placeOrder, getOrderById ,payNow } from "../../Api/OrderApi/orderApi";

const BillingPage = () => {

    const { id } = useParams()
    const [productArr, setProductArr] = React.useState([])
    const [cartTotal, setCartTotal] = React.useState([])
    const [shippingDetails, setShippingDetails] = React.useState()
    const [user, setUser] = React.useState()
    React.useEffect(() => {
        // api call for getting shipping details
        const data = JSON.parse(Cookie.get(USER_INFO))
        if (data) {
            const email = data.email
            setUser(data)
            getShippingDetails(email, setShippingDetails)
        }
        if (!id) {
            const cartData = JSON.parse(localStorage.getItem(CART))
            if (cartData) {
                const arr = cartData.productList;
                setProductArr(arr)
                const total = cartData.total
                setCartTotal(total)
            }
        }
        else {

            getOrderById(id, setProductArr, setCartTotal)
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

    const handlePayment = () => {
        let orderList = []

        productArr.map((item) => {
            const obj = {
                name: item.name,
                orderQuantity: item.orderQuantity,
                price: item.price,
                image: item.image,
                productId: item.id,
                category: item.category
            }
            orderList.push(obj)
        })
        const data = {
            userEmail: user.email,
            userId: shippingDetails.userId,
            shippingId: shippingDetails.id,
            totalAmount: cartTotal,
            OrderList: orderList,
            userName: user.name
        }

        placeOrder(data)

    }

    const handlePay = () => {
        const data = {
            id: id,
            amount: cartTotal,
            email: user.email,
        }
        payNow(data)
    }

    return (
        <div className='my-container '>
            <div className='d-flex billing_page'>
                <div className='show-order'>
                    {/* display product */}
                    {product_list}

                    <p>Total : &#8377; {cartTotal}</p>
                </div>
                <div className='d-flex w-100 flex-column show-shipping-details'>
                    <h5>Shipping Detail</h5>
                    {
                        shippingDetails?.address && shippingDetails?.state && shippingDetails?.city && shippingDetails?.postalCode && shippingDetails?.country ?
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
                                    {
                                        id ?
                                            <Button
                                                className="nav-link add-to-cart"
                                                onClick={handlePay}
                                            >
                                                Pay Now
                                            </Button>
                                            :
                                            <Button
                                                className='nav-link add-to-cart'
                                                onClick={handlePayment}
                                                disabled={!shippingDetails.address || !shippingDetails.city || !shippingDetails.postalCode || !shippingDetails.country}
                                            >
                                                Proceed To Payment
                                            </Button>
                                    }
                                </div>

                            </div>

                            : 
                            <NavLink
                                    to={"/profile/shippingDetails"}
                                    className="text-primary text-decoration-underline text-center vertically-align-center"
                            >
                                Fill Shipping Details First
                            </NavLink>
                    }
                </div>
            </div>
        </div>
    )
}

export default BillingPage