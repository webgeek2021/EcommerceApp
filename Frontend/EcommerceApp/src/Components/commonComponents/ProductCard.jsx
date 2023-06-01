import React from 'react'
import { Button, Card } from "react-bootstrap";
import Rating from './Rating';
import { Link } from "react-router-dom"

const ProductCard = (props) => {
  return (
    <Link to={`/show/product/${props.id}`}>
      <Card>
        <div className='card-thumbnail'>
          <Card.Img src={props.image} alt="" className='poster' />
        </div>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <Rating
            rating={props.rating}
          />
          <Button className='add-to-cart'>Add To Cart</Button>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default ProductCard