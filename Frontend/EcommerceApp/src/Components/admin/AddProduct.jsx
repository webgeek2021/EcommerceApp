import React from 'react'
import { getAllProduct } from '../../Api/ProductApi/ProductApi'
import { useTable } from "react-table"
import { PRODUCT } from "../../utils/constants"
import { Badge, Button } from 'react-bootstrap'
import { GrAdd } from "react-icons/gr";
import { NavLink ,useNavigate} from 'react-router-dom'
import AddProductModalForm from "./AddProductModalForm";

const AddProduct = () => {

    const [products, setProducts] = React.useState([])
    const navigate = useNavigate();
    const [addModal , setAddModal] = React.useState(false)

    React.useEffect(() => {
        const call = async () => {
            const D = await getAllProduct()
            setProducts(D)
        }
        call()
    }, [])

    const columns = React.useMemo(
        () => [
            {Header : "product Id" , accessor : PRODUCT.ID},
            { Header: 'Name', accessor: PRODUCT.NAME },
            { Header: 'Category', accessor: PRODUCT.CATEGORY },
            { Header: 'subCategroy', accessor: PRODUCT.SUBCATEGORY },
            { Header: 'Price', accessor: PRODUCT.PRICE },
            { Header: 'Quantity', accessor: PRODUCT.QUANTITY },
            { Header: 'Status', accessor: PRODUCT.STATUS },
            { Header: 'Rating', accessor: PRODUCT.RATING },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: products });


    return (
        <div className='my-container add_product_container '>
            <h1>Products</h1>
            {/* <p>Fill in the details below to add a new product:</p> */}

            <div className='add_product_btn'>
                <Button onClick={()=>setAddModal(prev => !prev)}>
                    <GrAdd />
                    <span>Add Product</span>
                </Button>
            </div>

            <div className='table_container'>
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, index) => {
                            prepareRow(row);
                            { console.log(products[index]._id) }
                            return (
                                    <tr {...row.getRowProps()} onClick={()=> navigate(`/admin/product/${products[index]._id}`)}>
                                        {row.cells.map(cell => (

                                            <td {...cell.getCellProps()}>{
                                                cell.value === true ? <Badge pill bg="success">Available</Badge > :
                                                    cell.value === false ? <Badge pill bg="danger">Not Available</Badge > :
                                                        cell.render('Cell')}
                                            </td>
                                        ))}
                                    </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {
            addModal &&
             <AddProductModalForm 
                show = {addModal}
                handleShow={setAddModal}
             />
        }
        </div>

       
    )
}

export default AddProduct