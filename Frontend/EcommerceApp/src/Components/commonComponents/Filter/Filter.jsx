import React from 'react'
import Form from 'react-bootstrap/Form';
import {getSubcategory , getAllCategories} from "../../../Api/CategoryApi/categoryApi"
import { useDispatch , useSelector } from 'react-redux';
import CategoryDropDown from '../CategoryDropDown';
import { filterProduct, getAllProduct } from '../../../Api/ProductApi/ProductApi';
import { ALL } from '../../../utils/constants';
const Filter = () => {

  const dispatch = useDispatch()
  const filtersByCategory = useSelector(state => state.category.subCategory)

  const handleFilter = (e)=>{
    console.log(e)
    if(e.subcategory === ALL){
      getAllProduct(dispatch)
    }else{
      filterProduct(e , dispatch)
    }
  } 
  React.useEffect(()=>{
    // api call for getting all categories
    getSubcategory("Electronic" , dispatch)
  },[])

  const filters = filtersByCategory?.map((cat,index)=>{
    console.log("Filters" , cat)
    return(
      <CategoryDropDown
      handleFilter = {handleFilter}
        category = {cat.category}
        subCategory = {cat.subCategory}
        key={index}
      />
    )
  })
  return (
    <div className='filter-container'>
        <h5>Filters</h5>
        <div className='filters'>
            {/* <Form. */}
            <span className='filter-title'>Filter By Categories</span>
            {filters}
        </div>
    </div>
  )
}

export default Filter