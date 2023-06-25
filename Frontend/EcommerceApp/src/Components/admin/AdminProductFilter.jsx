import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSubcategory } from '../../Api/CategoryApi/categoryApi'
import { Button } from 'react-bootstrap'
import FilterBadge from './FilterBadge'
import { filterProduct, getAllProduct } from '../../Api/ProductApi/ProductApi'
import { ALL } from '../../utils/constants'
const AdminProductFilter = () => {

    const categories = useSelector(state => state.category.categoryList)
    const filters = useSelector(state => state.category.subCategory)
    const dispatch = useDispatch()
    console.log("Admin Filters", filters)
    console.log("Admin Categories", categories)

    React.useEffect(() => {
        categories.map((cat) => {
            getSubcategory(cat.category, dispatch)
        })
    }, [categories])
    const handleFilter = (sub) => {
        console.log(sub)
        if (sub.subcategory === ALL) {
            getAllProduct(dispatch)
        } else {
            filterProduct(sub, dispatch)

        }

    }
    const filterList = filters.map((filter) => {

        if (filter.subCategory.length > 0) {

            return (
                <div className='admin-filter'>
                    <h5>{filter.category}</h5>
                    <div className='filter-subcategory'>
                        {
                            filter.subCategory.map((sub) => {
                                if (sub) {
                                    return (
                                        <FilterBadge
                                            title={sub}
                                            category={filter.category}
                                            handleFilter={handleFilter}
                                        />
                                    )

                                }
                            })
                        }
                    </div>
                </div>
            )
        }
    })
    return (
        <div className='admin-filter-container'>
            Filters
            <div className='filter-holder'>
                {filterList}
            </div>
        </div>
    )
}

export default AdminProductFilter