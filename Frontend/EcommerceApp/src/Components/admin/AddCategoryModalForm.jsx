
import React from 'react'
import { Image, Modal, Row, Col, Button } from 'react-bootstrap';
import Noimage from "../../assets/Images/no-image.png"
import {addCategory} from "../../Api/CategoryApi/categoryApi";
const AddCategoryModalForm = (props) => {

    const [categoryData, setCategoryData] = React.useState({
        "category": "",
        "description": "",
        "image": "",
    })

    const [imageUrl, setImageUrl] = React.useState()

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = () => {
            setImageUrl(reader.result)
            setCategoryData((prev) => ({
                ...prev,
                ["image"]: file
            }))
        }
    }
    const handleOnChange = (e) => {
        const {value , name} = e.target

        setCategoryData((prev)=>({
            ...prev,
            [name] : value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append("category" ,categoryData.category)
        formData.append("description" , categoryData.description)
        formData.append("image" , categoryData.image)
        addCategory(formData)
        props.handleShow()
    }
    return (
        <Modal
            show={props.show}
            onHide={() => props.handleShow()}
            dialogClassName='modal-90w'
            className='add-modal'
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Add Category
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='my-container '>
                <form onSubmit={handleSubmit} className='d-flex flex-column'>
                    <input
                        type="text"
                        name="category"
                        placeholder='Enter Your Category'
                        onChange={handleOnChange}
                        value={categoryData.category}
                        required
                    />
                    <textarea
                        rows={4}
                        onChange={handleOnChange}
                        placeholder='Enter Category Description'
                        name="description"
                    >
                        {categoryData.description}
                    </textarea>

                    <div className='drag-zone' >
                        {
                            imageUrl ?
                                <Image src={imageUrl} alt='' />
                                :
                                <Image src={Noimage} alt="" />
                        }
                    </div>

                    <input
                        type="file"
                        className='add-to-cart'
                        accept='image/*'
                        name="image"
                        placeholder='Upload Image'
                        onChange={handleFileUpload}
                        required
                    />
                    <Button className='w-100 add-to-cart' type="submit">Submit</Button>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default AddCategoryModalForm