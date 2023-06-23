import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
const CategoryDropDown = (props) => {

  const list = props.subCategory?.map((subcategory, index) => {

    const obj = {
      category: props.category,
      subcategory: subcategory
    }
    console.log(subcategory)
      return (
        <Dropdown.Item key={index} onClick={() => props.handleFilter(obj)}>
          {subcategory}
        </Dropdown.Item>
      )
    
  })
  return (
    <div className='category-dropdown'>
      <DropdownButton id="dropdown-basic-button" title={props.category}>
        {list}
      </DropdownButton>

    </div>
  )
}

export default CategoryDropDown