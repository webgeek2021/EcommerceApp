import React from 'react'
import { NavLink } from "react-router-dom"

const ProfileSidebar = () => {
  return (
    <nav className='profile-sidebar'>
      <ul className='d-flex flex-column'>
        <NavLink
          to={"/profile"}
          className={({ isActive }) => (isActive ? 'active' : 'inactive')}

        >Profile</NavLink>
        <NavLink
          to={"/profile/shippingDetails"}
          className={({ isActive }) => (isActive ? 'active' : 'inactive')}
        >Shippin Details</NavLink>
      </ul>
    </nav>
  )
}

export default ProfileSidebar