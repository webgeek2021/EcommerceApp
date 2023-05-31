
import React from 'react'
import { Modal, Button } from "react-bootstrap"
import { deleteProduct } from '../../Api/ProductApi/ProductApi'
import { useNavigate } from 'react-router-dom'
const DeleteConfirmation = (props) => {

   
    const navigate = useNavigate()
    const handleDelete = ()=>{
        
        if(props.id){
            console.log("Make Api Call" , props.id)
            deleteProduct(props.id , navigate)
            
        }
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
                    <Button variant='outline-danger' onClick={handleDelete}>Delete</Button>
                    <Button variant='outline-dark' onClick={()=>props.handleShow()}>Cancel</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteConfirmation