
import React from 'react'
import { Dropdown , Offcanvas} from 'react-bootstrap';
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from '../../Api/ProductApi/ProductApi';
import { setShowCart } from '../../ReduxStore/slices/cartSlice';
import CartCard from './CartCard';
const DisplayCart = (props) => {

    const productIds = useSelector(state => state.cart.productIds)
    const productArr = useSelector(state => state.productData.productList)
    const show = useSelector(state => state.cart.showCart)
    const [total , setTotal] = React.useState(0)

    console.log("ProdcutArr", productIds)
    const dispatch = useDispatch()
    React.useEffect(() => {
        if (productIds.length > 0) {
            productIds.map((obj) => {
                getProductList(obj.id, dispatch, obj.quantityPurchase)
            })
        }
        console.log(productIds)
    }, [productIds])
    const handleClose = ()=>{
        dispatch(setShowCart())
    }

    const list = productArr.map((prod)=>{
        return(
           <CartCard 
            name = {prod.name}
            category = {prod.category}
            id = {prod.id}
            price = {prod.price}
            orderQuantity = {prod.orderQuantity}
            image = {prod.image}
            quantity = {prod.quantity}
           />
        )
    })
    return (
        <Offcanvas 
            show={show} 
            onHide={handleClose} 
            placement='start'
            className = "display-cart-container"
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
               {list}
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default DisplayCart