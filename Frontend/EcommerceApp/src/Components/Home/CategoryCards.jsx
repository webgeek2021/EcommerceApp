
import React from 'react'
import { category_data } from './carouselData'
import { Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import BottomUpAnimation from '../../utils/BottomUpAnimation'
import useElementOnScreen from '../../utils/Hooks/ElementOnScreen';

const CategoryCards = () => {
    const [categoryData, setCategoryData] = React.useState(category_data)
    const [containerRef, isVisible] = useElementOnScreen(
        {
            root : null,
            rootMargin  : "0px",
            threshold : 1
        }
    )
    const display = categoryData.map((cat) => {
        return (
            <NavLink to={`/category/${cat.category}`} className={`category_card ${isVisible ? "animate" : "hide-cards"}`}>
                <h4 className='text-center category'>{cat.category}</h4>
                <Image src={cat.poster} />
            </NavLink>
        )
    })
    console.log("REf" , containerRef)
    console.log("Visible" , isVisible)
    return (
        <div className='category_card_container' >
            <p className='title'>Shop Our Top Categories</p>
            <div ref={containerRef} className='d-flex align-items-center flex-wrap justify-content-between cards_container'>
                {display}
            </div>
        </div>
    )
}

export default CategoryCards