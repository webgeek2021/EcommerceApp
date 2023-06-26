
import React from 'react'
import { getAllProductByCategory, deleteCategory } from '../../Api/CategoryApi/categoryApi'
import { useParams } from 'react-router-dom'
import { NavLink,useNavigate } from 'react-router-dom'
import { Card, Button, Badge } from "react-bootstrap"
import { GrAdd } from 'react-icons/gr'
import Rating from '../commonComponents/Rating'
import AddProductModalForm from './AddProductModalForm'
const CategoryPage = (props) => {

    const { category } = useParams()
    const navigate = useNavigate()
    const [addModal, setAddModal] = React.useState(false)
    const [productData, setProductData] = React.useState([])
    React.useEffect(() => {
        getAllProductByCategory(category, setProductData)
    }, [])

    const data = productData?.map((p) => {
        return (
            <NavLink to={`/admin/product/${p.id}`} className="category-page-card">
                <Card>
                    <div className='card-thumbnail'>
                        <Card.Img src={p.image} alt="" className='poster' />
                        {
                            p.isAvailable ?
                                <Badge pill bg="success">Available</Badge >
                                :
                                <Badge pill bg="success">Available</Badge >
                        }
                    </div>
                    <Card.Body>
                        <Card.Title>{p.name}</Card.Title>
                        <Card.Text>{p.description}</Card.Text>
                        <Rating
                            rating={p.rating}
                        />
                        {/* <Button className='add-to-cart'>Explore</Button> */}
                    </Card.Body>
                </Card>
            </NavLink>
        )
    })

    const handleDelete = ()=>{
        deleteCategory(category , navigate)
         
    }
    return (
        <div className='my-container category-page'>
            <div className='d-flex justify-content-between add_product_btn'>
                <Button onClick={() => setAddModal(prev => !prev)}>
                    <GrAdd />
                    <span>Add Product</span>
                </Button>
                <div className='delete-icon c-pointer' onClick={handleDelete}>
                    Delete Category
                </div>
            </div>
            <div className='product-list'>{data}</div>
            {
                addModal &&
                <AddProductModalForm
                    show={addModal}
                    handleShow={setAddModal}
                />
            }
        </div>
    )
}

export default CategoryPage