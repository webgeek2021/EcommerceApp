import React from 'react'
import { carousel_Data } from './carouselData'
import CustomCarousel from "./CustomCarousel";
import { Image, Container, Row, Col } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import BottomUpAnimation from '../../utils/BottomUpAnimation';
import CategoryCards from './CategoryCards';
import { laptopsData } from '../../utils/DummyData/LaptopData';
import ProductCard from '../commonComponents/ProductCard';
import axios from "axios"
import Filter from '../commonComponents/Filter/Filter';
import { useDispatch, useSelector } from "react-redux"
import { getAllProduct } from '../../Api/ProductApi/ProductApi';
import NoDataFound from '../commonComponents/NoDataFound';

const HomePage = () => {

  const productCardsData = useSelector(state => state.productData.productDataByFilter)

  const dispatch = useDispatch()
  React.useEffect(() => {

    getAllProduct(dispatch)


  }, [])

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

  const productCards = productCardsData?.map((card) => {
    // console.log(card)
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

  console.log("Product Card", productCards)
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

      {/* <section className='my-container display_categories'>
        <CategoryCards />
      </section> */}

      <section className='my-container  display_products'>
        <Container>
          <Row>
            <Col md={2}>
              <Filter />
            </Col>
            <Col md={10}>
              {
                productCardsData.length > 0
                  ?
                  <div className='product-list'>
                    <p className='title'>Products</p>
                    <div className='cards-list'>

                      {productCards}

                    </div>
                  </div>
                  :
                  <NoDataFound/>
              }
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default HomePage