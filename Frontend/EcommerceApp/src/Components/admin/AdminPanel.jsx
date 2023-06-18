import React from 'react'
import { getTotalAmount } from '../../Api/OrderApi/orderApi'
import { useDispatch, useSelector } from "react-redux";
import { Container } from 'react-bootstrap';
const AdminPanel = () => {

  const dispatch = useDispatch()
  const total = useSelector(state => state.admin.totalEarning)
  React.useEffect(() => {
    getTotalAmount(dispatch)
  }, [])
  return (
    <Container >
      <div className='d-flex flex-column align-items-center  admin-panel-container'>
        <h3>Admin Panel</h3>
        <div className='w-100 text-center admin-panel-header'>
          <span>Total Earning Till Date : &#8377; </span>{total}
        </div>
        
      </div>
    </Container>
  )
}

export default AdminPanel