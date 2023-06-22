
import React from 'react'
import { Modal, Button } from "react-bootstrap"
import { deleteOrder } from '../../Api/OrderApi/orderApi'
const DeleteOrderConfirmation = (props) => {

    const handleDelete = (id)=>{
        // api call to delete this order
        console.log("Delete " , id)
        const data = {
            id : props.order_Id
        }
        deleteOrder(data)
        props.handleShow()
    }
    
    return (
        <Modal
            show={props.show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={props.handleShow}
            className='delete-modal'
        >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <h4>Are You Sure Want To Delete this Order {props?.order_Id} ?</h4>
                <div className='btn-section'>
                    <Button variant='outline-danger' onClick={()=>handleDelete(props.order_Id)}>Delete</Button>
                    <Button variant='outline-dark' onClick={()=>props.handleShow()}>Cancel</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteOrderConfirmation