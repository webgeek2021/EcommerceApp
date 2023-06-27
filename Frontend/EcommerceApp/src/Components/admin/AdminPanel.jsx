import React from 'react'
import { getTotalAmount } from '../../Api/CategoryApi/categoryApi'
import { useDispatch, useSelector } from "react-redux"
import { Container } from 'react-bootstrap';
import PieChart from '../Charts/PieChart';
import { NUMBER_OF_PRODUCT_CHART, SALES_CHART } from '../../utils/constants';
import { getTotalUsers } from '../../Api/UserApi/UserApi';
const AdminPanel = () => {

  const dispatch = useDispatch()
  const total = useSelector(state => state.admin.totalEarning)
  const [totalUsers , setTotalUser] = React.useState(0)
  React.useEffect(() => {
    getTotalAmount(dispatch)
    getTotalUsers(setTotalUser)
  }, [])
  return (
    <Container >
      <div className='d-flex flex-column align-items-center  admin-panel-container'>
        <h3>Admin Panel</h3>
        <div className='w-100 d-flex align-items-center justify-content-around admin-panel-header'>
          <div className='text-center '>
            <span>Total Earning Till Date : &#8377; </span>{total}
          </div>
          <div className='text-center '>
            <span>Total User Registered Till Date : </span> {totalUsers}
          </div>
        </div>
        <div className='d-flex pie-chart-container'>
          <div className='pie text-center'>
            {/* <h4 className='title'>{NUMBER_OF_PRODUCT_CHART}</h4> */}
            <PieChart
              title={NUMBER_OF_PRODUCT_CHART}
            />
          </div>
          <div className='pie text-center'>
            
            <PieChart
              title={SALES_CHART}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default AdminPanel