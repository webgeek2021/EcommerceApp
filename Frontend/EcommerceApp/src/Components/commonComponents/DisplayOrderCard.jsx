import React from 'react'
import { Table, Image } from "react-bootstrap";
const DisplayOrderCard = (props) => {

    const orderList = props.body.map((order, index) => {
        return (
            <tr className='body-order-wrapper-row' key={index}>
                <td className='order-image'>
                    <Image src={order.image} />
                </td>
                <td className='order-name'>
                    {order.name}
                </td>
                <td className='order-quantity'>
                    {order.orderQuantity}
                </td>
                <td className='order-proce'>
                    <span>&#8377;</span> <span>{order.price}</span>
                </td>
            </tr>
        )
    })
    return (
        <div className='display-order-card'>
            <div className='display-title'> 
                <div className='timeStamp'>{props.Date}</div>
                {
                    props.header.paymentStatus === false && <div className='pay-now'>Pay Now</div>
                }
            </div>
            <div className='d-flex aling-items-center justify-content-between order-header'>
                {/* payment id , isPaid , isDelivered */}
                <div className='order-header-wrapper'>
                    <span className='key'>Order Id</span> <div className='value orderId'>{props.header.orderId}</div>
                </div>

                <div className='order-header-wrapper'>
                    <span className='key'>Payment Status</span>
                    <div className='value'>
                        {
                            props.header.paymentStatus ?
                                <div className='success'>Paid</div>
                                :
                                <div className='failure'>Not Paid</div>
                        }
                    </div>
                </div>

                <div className='order-header-wrapper'>
                    <span className='key'>Delivery Status</span>
                    <div className='value'>
                        {
                            props.header.isDeliver ?
                                <div className='success'>Delivered</div>
                                :
                                <div className='failure'>Not Delivered</div>
                        }
                    </div>
                </div>

            </div>
            <div className='order-body'>
                {/* list of product - name ,quantity , price , image */}
                <Table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList}
                    </tbody>
                </Table>
            </div>
            <div className='d-flex align-items-center justify-content-between order-footer'>
                {/* total amount  */}
                <div className='total'>Total</div>
                <div><span>&#8377;</span>  <span className='total'>{props.total}</span></div>
            </div>
        </div>
    )
}

export default DisplayOrderCard