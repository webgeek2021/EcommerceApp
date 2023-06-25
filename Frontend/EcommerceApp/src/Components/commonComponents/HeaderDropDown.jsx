import React from 'react'
import { NavDropdown , Row , Col,Image } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import Furniture from "../../assets/Icons/Furniture.png"
import Bags from "../../assets/Icons/handBag.png"
import headphone from "../../assets/Icons/headphone.png"
import laptop from "../../assets/Icons/laptop.png"
import shoes from "../../assets/Icons/shoes.png"
import books from "../../assets/Icons/book.png"


const HeaderDropDown = () => {
    // api call for get Categories
    const dropDownInfo = [
       
        {
            category: "Book",
            status: "Available",
            count: "240 items",
            poster : books
        },
        {
            category: "Headphone",
            status: "Available",
            count: "240 items",
            poster : headphone
        },
        {
            category: "Laptop",
            status: "Available",
            count: "240 items",
            poster : laptop
        },
    ]
    const [content, setContent] = React.useState(dropDownInfo)
    const items = content.map((item) => {
        return (
            <Col sm={12} md={6} className='column '>
                <NavLink 
                    className="dropdown-item c-black"
                    to={`/products/${item.category}}`}
                >
                    <div className='d-flex align-items-center dropdown__holder'>
                        <Image src={item.poster} alt=""/>
                        <div className='category__info'>
                            <p className='title'>{item.category}</p>
                            <p className='details'>
                                <span className=''>{item.count}</span>
                                <span>{item.status}</span>
                            </p>
                        </div>
                    </div>
                </NavLink>
            </Col>
        )
    })
    return (
        <NavDropdown title="Category" id="collasible-nav-dropdown" className='c-black'>
            <div className=' title ' >Popular Category</div>
            <hr/>
            <Row>
                {items}
            </Row>
        </NavDropdown>
    )
}

export default HeaderDropDown