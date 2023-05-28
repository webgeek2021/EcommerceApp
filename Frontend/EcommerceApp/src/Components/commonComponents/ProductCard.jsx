import React from 'react'
import {Button, Card} from "react-bootstrap";
import Rating from './Rating';

const ProductCard = (props) => {
  return (
    <Card>
      <Card.Img src={props.image}/>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Rating
          rating= {props.rating}
        />
        <Button className='add-to-cart'>Add To Cart</Button>
      </Card.Body>
    </Card>    
  )
}

export default ProductCard