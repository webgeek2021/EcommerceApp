
import React from 'react'
import { useLocation } from 'react-router-dom';
import { CART } from '../../utils/constants';
import { Image } from 'react-bootstrap';
import SuccessLogo from "../../assets/Images/Success.png";
import { IoCopy } from "react-icons/io5"
import { NavLink } from 'react-router-dom';
const PaymentSuccess = () => {
  const location = useLocation();
  const reference = new URLSearchParams(location.search).get('reference');

  const handleCopy = ()=>{
    navigator.clipboard.writeText(reference)
  }
  React.useEffect(() => {
    if (reference) {
      localStorage.clear(CART)
    }
  }, [])
  return (
    <div className='d-flex align-items-center vh-80  justify-content-center'>
      <div className='d-flex flex-column align-items-center payment-success '>
        <Image src={SuccessLogo} alt="" />
        <p>Payment Id</p>
        <div className='d-flex align-items-center '>
          <h5 className='m-r-10'>{reference}</h5>
          <IoCopy onClick={handleCopy} className='c-pointer'/>
        </div>
        <NavLink to={"/"} className="text-primary">
          Back to Home
        </NavLink>
      </div>
    </div>
  )
}

export default PaymentSuccess