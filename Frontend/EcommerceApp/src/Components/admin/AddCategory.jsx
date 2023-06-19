
import React from 'react'
import { getAllCategories } from "../../Api/CategoryApi/categoryApi"
import { useDispatch, useSelector } from "react-redux";
import { GrAdd } from 'react-icons/gr';
import { Button, Image } from "react-bootstrap"
import AddCategoryModalForm from './AddCategoryModalForm';
import { NavLink } from 'react-router-dom';
const AddCategory = () => {
  const dispatch = useDispatch()
  const category = useSelector(state => state.category.categoryList)
  const [addModal, setAddModal] = React.useState(false)

  React.useEffect(() => {
    getAllCategories(dispatch)
  }, [])

  const data = category?.map((cat) => {
    console.log("cat", cat)
    return (
      <NavLink 
        className='category-card'
        to={`/admin/category/${cat.category}`}
      >
        <Image src={cat.image} alt=""/>
        <h4>{cat.category}</h4>
      </NavLink>
    )
  })

  console.log("Data", data)

  return (
    <div className='my-container add-category-container'>
      <h3>Categories</h3>

      <div className='add_product_btn'>
        <Button onClick={() => setAddModal(prev => !prev)}>
          <GrAdd />
          <span>Add Category</span>
        </Button>
      </div>

      {
        data.length > 0 ?
          <div className=' d-flex flex-wrap card-container'>
            {data}
          </div>
          :
          <div className='d-flex align-items-center justify-content-center vh-80'>No Data Found</div>
      }

      {
        addModal &&
        <AddCategoryModalForm
          show={addModal}
          handleShow={setAddModal}
        />
      }
    </div>
  )
}

export default AddCategory