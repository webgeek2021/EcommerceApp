import React from 'react'
import { useParams } from 'react-router-dom'
import Rating from './Rating'
import { useDispatch, useSelector } from "react-redux"
import { getProductById2 } from "../../Api/ProductApi/ProductApi"
import { Image, Button } from "react-bootstrap"
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import { toast } from "react-toastify"
import { insertProductIntoCart } from '../../ReduxStore/slices/cartSlice'
const ProductDisplay = () => {

    const { id } = useParams()
    const productData = useSelector(state => state.productData.productData)
    const [quantityCounter, setQuantityCounter] = React.useState(1)
    const dispatch = useDispatch()

    React.useEffect(() => {
        getProductById2(id, dispatch)
    }, [])

    const handlePlusCounter = ()=>{
        if(quantityCounter < productData.quantity){
            setQuantityCounter(prev => prev + 1);
        }else{
            toast.warning("Quantity Exceeds")
        }
    }
    const handleMinusCounter = ()=>{
        if(quantityCounter  >  1){
            setQuantityCounter(prev => prev - 1)
        }
    }
    const addToCart = ()=>{

        const data ={
            id : productData.id,
            quantityPurchase : quantityCounter
        }

        dispatch(insertProductIntoCart(data))

    }
    return (
        <div className='my-container user-product-display '>
            {
                productData ?
                    <div className='d-flex justify-content-between  product-display-container'>
                        <div className='left'>
                            <Image src={productData.image} alt={`${productData.name} image`} />
                        </div>
                        <div className='d-flex flex-column right'>
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
                                    <AiOutlinePlus onClick={handlePlusCounter} className='plus'/>
                                    <span>{quantityCounter}</span>
                                    <AiOutlineMinus onClick={handleMinusCounter} className='minus' />
                                </div>
                                <Button className="add-to-cart" onClick={addToCart}>Add To Cart</Button>
                            </div>
                        </div>
                    </div>
                    :
                    <h1>Loading</h1>
            }
        </div>
    )
}

export default ProductDisplay