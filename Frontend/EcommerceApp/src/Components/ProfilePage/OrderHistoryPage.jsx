import React from 'react'
import { CART, USER_INFO } from '../../utils/constants'
import Cookie from 'js-cookie';
import { getOrders } from '../../Api/OrderApi/orderApi';
import { useDispatch, useSelector } from 'react-redux';
import DisplayOrderCard from '../commonComponents/DisplayOrderCard';
import moment from "moment"
const OrderHistoryPage = () => {

  const user = JSON.parse(Cookie.get(USER_INFO))
  const orders= useSelector(state => state.orders.orderData)
  const dispatch = useDispatch()

  React.useEffect(() => {
    const email = user?.email
    console.log(email)
    if (email) {
      getOrders(dispatch, { email })

    }
  },[])

  const data = orders?.map((order) => {
    const orderId = order.razorPayOrderId;
    const paymentStatus  = order.isPaid;
    const isDeliver = order.isDelivered;
    const formattedDate = moment(order.createdAt).format('DD-MM-YYYY');

    return (
      <DisplayOrderCard
        Date = {formattedDate}
        header={{orderId , paymentStatus , isDeliver}}
        body = {order.OrderList}
        total= {order.totalAmount}
        email = {order.userEmail}
      />
    )
  })
  return (
    <div className='w-100'>
      {
        orders ? data : <h1>Loading....</h1>
      }
    </div>
  )
}

export default OrderHistoryPage