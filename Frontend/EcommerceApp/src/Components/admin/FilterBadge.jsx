import React from 'react'
import { Button } from 'react-bootstrap'
const FilterBadge = (props) => {
    return (
        <Button className='filter-btn'
            onClick={
                () => props.handleFilter(
                    {
                        "category": props.category,
                        "subcategory":props.title
                    }
                )
            }>
            {props.title}
        </Button>
    )
}

export default FilterBadge