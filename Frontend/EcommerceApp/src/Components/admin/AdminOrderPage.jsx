import React from 'react'
import { getAllOrders } from '../../Api/OrderApi/orderApi'
import { useDispatch, useSelector } from 'react-redux'
import DisplayOrderCard from '../commonComponents/DisplayOrderCard'
import moment from 'moment'
const AdminOrderPage = () => {

    const dispatch = useDispatch()
    const [orderList, setOrderList] = React.useState(useSelector(state => state.orders.orderData))
    React.useEffect(() => {
        getAllOrders(setOrderList)
    }, [])

    const data = orderList?.map((order) => {
        const orderId = order.razorPayOrderId;
        const paymentStatus = order.isPaid;
        const isDeliver = order.isDelivered;
        const formattedDate = moment(order.createdAt).format('DD-MM-YYYY');
        const orderStatus = order.orderStatus
        return (
            <DisplayOrderCard
                Date={formattedDate}
                header={{ orderId, paymentStatus, isDeliver ,orderStatus}}
                body={order.OrderList}
                total={order.totalAmount}
                isAdmin = {true}
                orderId = {order._id}
            />
        )
    })


    return (
        <div className='w-100 my-container admin-order-page'>
            {data ? data : <h1>Loading</h1>}
        </div>
    )
}

export default AdminOrderPage