import React from 'react'
import { useParams } from 'react-router-dom'
import { getProductById, editProductData } from '../../Api/ProductApi/ProductApi'
import { useSelector } from 'react-redux'
import { USER_INFO, ADMIN } from '../../utils/constants';
import { Image, Button } from 'react-bootstrap';
import { FiEdit3 } from "react-icons/fi";
import { convertBase64 } from '../../utils/constants';
import DeleteConfirmation from './DeleteConfirmation';
import Cookie from "js-cookie";
const ProductDisplay = () => {

  const [productData, setProductData] = React.useState()
  // const userInfo = JSON.parse(localStorage.getItem(USER_INFO));
  const [user,setUser] = React.useState(null)

  const [productUrl, setProductUrl] = React.useState()
  // const [admin, setAdmin] = React.useState(userInfo?.roles?.Admin === ADMIN ? true : false)
  const [formData, setFormData] = React.useState({
    "category": "",
    "name": "",
    "description": "",
    "image": "",
    "price": "",
    "quantity": "",
    "rating": ""
  })

  const [editName, setEditName] = React.useState(false)
  const [editcategory, setEditCategory] = React.useState(false)
  const [editDescription, setEditDescription] = React.useState(false)
  const [editPrice, setEditPrice] = React.useState(false)
  const [editQuantity, setEditQuantity] = React.useState(false)
  const [deleteModal , setDeleteModal] = React.useState(false)

  const { id } = useParams()

  React.useEffect(() => {
    const user = Cookie.get(USER_INFO)
    if (user) {
      setUser(JSON.parse(user))
    }
    const getData = async () => {
      const data = await getProductById(id)
      setProductData(data)
      setProductUrl(data.image)
    }
    getData()
  }, [])
  const handleOnChange = (event) => {
    console.log(event)
    let { value, name } = event.target;

    setProductData((prev) => ({
      ...prev,
      [name]: value
    }))

  }
  const uploadImage = async (event) => {
    const files = event.target.files;
    console.log(files.length);
    const reader = new FileReader()
    reader.readAsDataURL(files[0])

    reader.onloadend = () => {
      setProductUrl(reader.result)
      setProductData(prev => ({
        ...prev,
        ["image"]: files[0]
      }))
    }

  };
  const handleSubmit = (ev) => {
    // const edit = async () => {
      // }
      ev.preventDefault()
      let formData = new FormData()
      formData.append("name" , productData.name)
      formData.append("category" , productData.category)
      formData.append("description" , productData.description)
      formData.append("image" , productData.image)
      formData.append("price" , productData.price)
      formData.append("quantity" , productData.quantity)
      formData.append("id" , productData.id)
      editProductData(formData)
    // edit()
  }
  return (
    <section className='my-container'>
      <div className='d-flex justify-content-between m-t-10 product-header'>
        <h1>{productData?.name}</h1>
        <Button className='btn btn-danger' onClick={()=>setDeleteModal(prev=> !prev)}>Delete Product</Button>
      </div>

      <form onSubmit={handleSubmit} className='d-flex  justify-content-around w-100 product_display_container'>
        <div className='d-flex flex-column image_section'>
          <Image src={productUrl} alt="" className='img' />
          {
            user?.isAdmin &&
            <input
              type="file"
              name="image"
              onChange={uploadImage}
              accept="image/*"
              className="add-to-cart"
              placeholder='Upload New Image'

            />

          }
        </div>
        <div className='d-flex flex-column  product_info_section'>

          <div className='titles'>
            <div className='admin-edit-container'>
              <input
                type='text'
                name="name"
                placeholder='Enter Product Name'
                value={productData?.name}
                onChange={handleOnChange}
                disabled={!editName}
              />
              <FiEdit3 onClick={() => setEditName(prev => !prev)} />
            </div>
            <div className='admin-edit-container'>
              <input
                type='text'
                placeholder='Enter Product Category'
                value={productData?.category}
                onChange={handleOnChange}
                name="category"
                disabled={!editcategory}
              />
              <FiEdit3 onClick={() => setEditCategory(prev => !prev)} />

            </div>
          </div>

          <div className='admin-edit-container product-description'>
            <input
              type='text'
              placeholder='Enter Product Description'
              value={productData?.description}
              onChange={handleOnChange}
              disabled={!editDescription}
              name='description'
            />
            <FiEdit3 onClick={() => setEditDescription(prev => !prev)} />
          </div>

          <div className='d-flex align-items-center w-100 justify-content-between other-info'>
            <div className='info text-center'>
              <span className='title'>Price</span>
              <div className='admin-edit-container'>

                <span className='rupee-symbol'>&#8377;</span>
                <input
                  type="number"
                  placeholder='Enter Price'
                  value={productData?.price}
                  disabled={!editPrice}
                  name='price'
                  onChange={handleOnChange}
                />
                <FiEdit3 onClick={() => setEditPrice(prev => !prev)} />
              </div>
            </div>
            <div className='info text-center'>
              <span className='title'>Quantity</span>
              <div className='admin-edit-container'>
                <input
                  type="number"
                  placeholder='Enter Quantity'
                  value={productData?.quantity}
                  disabled={!editQuantity}
                  name='quantity'
                  onChange={handleOnChange}
                />
                <FiEdit3 onClick={() => setEditQuantity(prev => !prev)} />
              </div>
            </div>
            <div className='info text-center'>
              <span className='title'>Rating</span>
              <span > {productData?.rating}</span>
            </div>

          </div>

          <Button className='add-to-cart' type="submit">Submit</Button>
        </div>
      </form> 
      
      
      <DeleteConfirmation 
        show={deleteModal}
        handleShow = {setDeleteModal}
        name = {productData?.name}
        id={productData?.id}
      />

    </section>
  )
}

export default ProductDisplay