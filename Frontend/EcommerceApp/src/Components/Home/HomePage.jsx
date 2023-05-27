import React from 'react'
import { carousel_Data } from './carouselData'
import CustomCarousel from "./CustomCarousel";
import { Image } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import BottomUpAnimation from '../../utils/BottomUpAnimation';
import CategoryCards from './CategoryCards';
const HomePage = () => {

  const [corouselData, setCarouselData] = React.useState(carousel_Data)

  const display = carousel_Data.map((slider) => {
    return (
      <div className='home_carousel_data'>
        <div className='category__info' >
          <h2>{slider.category}</h2>
          <p>{slider.description}</p>
          <NavLink to={`/category/${slider.category}`} className="primary-btn">Learn More</NavLink>
        </div>
        <Image src={slider.poster} alt="category image" />
      </div>
    )
  })

  const slider_options = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }


  return (
    <div className='home_page_container'>
      <section className='main_carousel_container'>
        <BottomUpAnimation>
          <CustomCarousel
            setting={slider_options}
          >
            {display}
          </CustomCarousel>
        </BottomUpAnimation>
      </section>

      <section className='my-container display_categories'>

        <CategoryCards />

      </section>
    </div>
  )
}

export default HomePage