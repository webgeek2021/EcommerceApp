import React from 'react'
import { carousel_Data } from './carouselData'
import CustomCarousel from "./CustomCarousel";
import { Image } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import BottomUpAnimation from '../../utils/BottomUpAnimation';
import CategoryCards from './CategoryCards';
import { laptopsData } from '../../utils/DummyData/LaptopData';
import ProductCard from '../commonComponents/ProductCard';
import axios from "axios"
const HomePage = () => {

  const [corouselData, setCarouselData] = React.useState(carousel_Data)
  const [laptopData , setLaptopData] = React.useState(laptopsData)
  const [productCardsData , setProductCardData] = React.useState([])

  React.useEffect(()=>{
    
    axios.get("http://localhost:3500/products/getProducts")
    .then(res => {
        if(res.data){
          setProductCardData(res.data)
        }
    })
  },[])

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

  const productCards = productCardsData?.map((card)=>{
    // console.log(card)
    return(
      <ProductCard 
        image = {card.image}
        name = {card.name}
        description = {card.description}
        rating = {card.rating}
        id={card.id}
      />
    )
  })
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

      <section className='my-container display_products'>
        <p className='title'>Today's Best Deals For You!</p>
        <div className='cards-list'>
        {
           productCards
        }
        </div>
      </section>
    </div>
  )
}

export default HomePage