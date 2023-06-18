
import React from 'react'
import { getAllCategories } from "../../Api/CategoryApi/categoryApi"
import { useDispatch, useSelector } from "react-redux";
import { GrAdd } from 'react-icons/gr';
import {Button } from "react-bootstrap"
const AddCategory = () => {
  const dispatch = useDispatch()
  const [category, setCategory] = React.useState(useSelector(state => state.category.categoryList))
  const [addModal , setAddModal] = React.useState(false)
  React.useEffect(() => {
    getAllCategories(dispatch)
  }, [])

  const data = category?.map((cat) => {
    return (
      <div className='category-card'>
        <h4>{cat.name}</h4>
      </div>
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
        data.length > 0 ? data : <div className='d-flex align-items-center justify-content-center vh-80'>No Data Found</div>
      }

    </div>
  )
}

export default AddCategory