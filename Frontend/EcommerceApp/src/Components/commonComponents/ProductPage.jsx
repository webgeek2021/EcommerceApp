import React from 'react'
import { useParams } from 'react-router-dom'
import { productBySearch } from '../../Api/ProductApi/ProductApi'
import ProductCard from './ProductCard'
const ProductPage = () => {
    const { search } = useParams()
    const [productList, setProductList] = React.useState([])

    React.useEffect(() => {
        productBySearch(search, setProductList)
    }, [search])

    const cards = productList?.map((card) => {
        return (
            <ProductCard
                image={card.image}
                name={card.name}
                description={card.description}
                rating={card.rating}
                id={card.id}
            />
        )
    })
    return (
        <div className='my-container products-page'>
            <div className='product-list'>
                {
                    cards.length > 0 ?
                        cards
                        :
                        <h1>No  data found</h1>
                }
            </div>
        </div>
    )
}

export default ProductPage