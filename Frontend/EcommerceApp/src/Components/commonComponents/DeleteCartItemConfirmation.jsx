
import React from 'react'
import { Modal, Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'
import {deleteProductFromCart} from "../../ReduxStore/slices/cartSlice";
const DeleteCartItemConfirmation = (props) => {

    const dispatch = useDispatch()

    const handleDelete = ()=>{
        dispatch(deleteProductFromCart(props.id))
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
                <h4>Are You Sure Want To Delete Product {props?.name} ?</h4>
                <div className='btn-section'>
                    <Button variant='outline-danger' onClick={()=>dispatch(deleteProductFromCart(props.id))}>Delete</Button>
                    <Button variant='outline-dark' onClick={()=>props.handleShow()}>Cancel</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteCartItemConfirmation