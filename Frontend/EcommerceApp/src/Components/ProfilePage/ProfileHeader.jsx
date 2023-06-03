
import React from 'react'
import {Button} from "react-bootstrap";
const ProfileHeader = (props) => {


  return (
    <div className='d-flex justify-content-between align-items-center profile-header'>
        <h4>{props.name} Account</h4>
        <Button className="sign-out-btn">Sign Out</Button>
    </div>
  )
}

export default ProfileHeader