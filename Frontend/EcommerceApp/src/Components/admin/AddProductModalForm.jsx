import React from 'react'
import { Image, Modal, Row, Col, Button } from 'react-bootstrap';
import { BsImage } from "react-icons/bs";
import Noimage from "../../assets/Images/no-image.png"
import { addProductApi } from '../../Api/ProductApi/ProductApi';
const AddProductModalForm = (props) => {


    const [productData, setProductData] = React.useState({
        "name": "",
        "category": "",
        "description": "",
        "image": "",
        "price": "",
        "quantity": "",
    })
    const [imageUrl, setImageUrl] = React.useState()

    const handleFileUpload = (ev) => {
        console.log(ev)
        const file = ev.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = () => {
            console.log(reader.result)
            setImageUrl(reader.result)
            setProductData((prev) => ({
                ...prev,
                ["image"]: reader.result
            }))
        }
    }

    const handleOnchange = (ev) => {
        const { value, name } = ev.target

        setProductData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = (ev) => {
        ev.preventDefault()
        console.log(productData)
        addProductApi(productData)
    }
    return (
        <Modal
            show={props.show}
            onHide={() => props.handleShow()}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
            className="addProduct-modal"

        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Add Product Here
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='my-container '>
                <form onSubmit={handleSubmit}className='d-flex flex-column'>
                    <input
                        type='text'
                        name="name"
                        placeholder='Enter Product Name'
                        onChange={handleOnchange}
                        value={productData.name}
                        required
                    />
                    <input
                        type='text'
                        name='category'
                        placeholder='Enter Product category'
                        onChange={handleOnchange}
                        value={productData.categroy}
                        required
                    />
                    <textarea rows={4} onChange={handleOnchange} name='description'>{productData.description}</textarea>
                    
                    <input
                        type='number'
                        placeholder='Enter Product Price'
                        name='price'
                        onChange={handleOnchange}
                        value={productData.price}
                        required
                    />
                    <input
                        type='number'
                        placeholder='Enter Product Quantity'
                        name='quantity'
                        onChange={handleOnchange}
                        value={productData.quantity}
                        required
                    />


                    <div className='drag-zone' >
                        {
                            imageUrl ?
                                <Image src={imageUrl} alt='' />
                                :
                                <Image src={Noimage} alt="" />
                        }
                    </div>
                    <input
                        type='file'
                        className='add-to-cart'
                        accept="image/*"
                        name='image'
                        placeholder='Upload New Image'
                        onChange={handleFileUpload}
                        required
                    />
                    <Button className="w-100 add-to-cart" type='submit'>Submit Product</Button>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default AddProductModalForm