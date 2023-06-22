import React from 'react'
import { Table, Image, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { payNow, setOrderStatus } from "../../Api/OrderApi/orderApi";
import DeleteOrderConfirmation from "../../Components/commonComponents/DeleteOrderConfirmation";
const DisplayOrderCard = (props) => {


    const [show, setShow] = React.useState(false)
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
    const handlePayNow = () => {
        const data = {
            id: props.header.orderId,
            amount: props.total,
            email: props.email,
        }
        payNow(data)
    }
    const handleDispatch = (orderId) => {
        const productIds = props.body.map((order) => {
            return { productId: order.productId, quantity: order.orderQuantity }
        })

        setOrderStatus({ productIds, orderId })
        toast.success("Order Status Updated SuccessFully")
    }
    return (
        <div className='display-order-card'>
            <div className='display-title'>
                <div className='timeStamp'>{props.Date}</div>
                <div className='btns d-flex align-items-center '>
                    {
                        props.header.paymentStatus === false && !props.isAdmin && <div className='pay-now m-r-10' onClick={handlePayNow}>Pay Now</div>
                    }
                    {/* {
                        <div className='delete-order' onClick={()=>setShow(prev => !prev)}>Delete Order</div>
                    } */}
                </div>
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
                            props.header.orderStatus === "Pending" ?
                                <div className='failure'>Pending</div>
                                :
                                <div className='success'>Shipped</div>
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
                <div>
                    <div className='total'>Total</div>
                    <div><span>&#8377;</span>  <span className='total'>{props.total}</span></div>
                </div>
                {
                    props.isAdmin &&
                    <Button
                        className="dispatch-btn btn-warning"
                        disabled={props.header.orderStatus === "Shipped" ? true : false}
                        onClick={() => handleDispatch(props.orderId)}
                    >Dispatch For Delivery</Button>
                }
            </div>
            {
                show && 
                <DeleteOrderConfirmation
                    show = {show}
                    handleShow= {setShow}
                    order_Id= {props.header.orderId}

                
                />
            }
        </div>
    )
}

export default DisplayOrderCard