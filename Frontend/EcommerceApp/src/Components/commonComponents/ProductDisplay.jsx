import React from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../../Api/ProductApi/ProductApi'
const ProductDisplay = () => {  

    const [productData , setProductData] = React.useState()
    const {id} = useParams()
    React.useEffect(()=>{
        const getData = async()=>{
            const data = await getProductById(id)
            setProductData(data)
        }
        getData()
    },[])

  return (
    <div className='product_display_container'>
        
    </div>
  )
}

export default ProductDisplay