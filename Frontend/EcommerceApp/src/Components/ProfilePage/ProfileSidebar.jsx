import React from 'react'
import { NavLink } from "react-router-dom"

const ProfileSidebar = () => {
  return (
    <nav className='profile-sidebar'>
      <ul className='d-flex flex-column'>
        <li>
          <NavLink
            to={"/profile"}
            className="nav-link"
          >Profile</NavLink>
        </li>
        <li>
          <NavLink
            to={"/profile/shippingDetails"}
            className="nav-link"
          >Shippin Details</NavLink>
        </li>
        <li>
          <NavLink
            to={"/profile/orderHistory"}
            className="nav-link"
          >Order History</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default ProfileSidebar