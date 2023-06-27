import React from 'react'
import { Button } from 'react-bootstrap'
import {filterOrder} from "../../Api/OrderApi/orderApi"
import { useDispatch } from 'react-redux'


const AdminOrderFilter = () => {

    
    const dispatch = useDispatch()
    const [isPaid , setIsPaid] = React.useState('')
    const [orderStatus , setOrderStatus] = React.useState('')


    React.useEffect(()=>{
        // if(isPaid != ''|| isShipped != ''){
            const data = {
                isPaid : isPaid,
                orderStatus : orderStatus
            }
            filterOrder(data,dispatch)
        // }
    },[isPaid , orderStatus])


    const handleReset = ()=>{
        console.log("RESET")
        setFilter({
            "isPaid" : '',
            "isShipped" : ''
        })
        setIsPaid('')
        setIsShipped('')

    }
    return (
        <div className='admin-order-filter'>
            <h5>Apply Filters</h5>
            <p className='filter-title'>Filter By Payment Status</p>
            <div className='d-flex flex-column filter-holder'>
                <label className='radio-label'>
                    Paid
                    <input
                        type='radio'
                        name='isPaid'
                        value={'true'}
                        selected={isPaid === 'true'}
                        onChange={() => setIsPaid(true)}
                    />
                </label>
                <label className='radio-label'>
                    Not Paid
                    <input
                        type='radio'
                        name='isPaid'
                        value={'false'}
                        selected={isPaid === 'false'}
                        onChange={() => setIsPaid(false)}
                    />
                </label>
            </div>
            <hr />
            <p className='filter-title'>Filter By OrderStatus</p>
            <div className='d-flex flex-column filter-holder'>
                <label className='radio-label'>
                    Pending
                    <input
                        type='radio'
                        name='orderStatus'
                        value='Pending'
                        selected={orderStatus === 'Pending'}
                        onChange={()=>setOrderStatus("Pending")}
                    />
                </label>
                <label className='radio-label'>
                    Shipped
                    <input
                        type='radio'
                        name='orderStatus'
                        value='Shipped'
                        selected={orderStatus === 'Shipped'}
                        onChange={()=>setOrderStatus("Shipped")}
                    />
                </label>
            </div>
            

            {/* <Button className="reset-btn" onClick={handleReset}>Reset</Button> */}
        </div>
    )
}

export default AdminOrderFilter