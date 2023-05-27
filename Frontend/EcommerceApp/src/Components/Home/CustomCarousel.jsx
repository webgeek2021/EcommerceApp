import React from 'react'
import Slider from "react-slick";


const CustomCarousel = ({setting , children}) => {
    return (
        <Slider
            {...setting}
        >
            {children}
        </Slider>
    )
}

export default CustomCarousel