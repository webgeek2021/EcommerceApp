import React from 'react'
import { Navbar, Nav, NavDropdown, Container, Image, Dropdown } from "react-bootstrap";
import logo from "../../assets/Icons/logo.svg";
import user from "../../assets/Icons/user.jpg";
import HeaderDropDown from './HeaderDropDown';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { USER_INFO } from '../../utils/constants';
import { AuthUser } from '../../ReduxStore/slices/authSlice';

import DisplayCart from './DisplayCart';
import { FiShoppingCart } from 'react-icons/fi';
import { setShowCart } from '../../ReduxStore/slices/cartSlice';
const Header = () => {

  const [isSignIn, setIsSignIn] = React.useState(useSelector((state) => state.auth.authData))
  const [isAdmin, setIsAdmin] = React.useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem(USER_INFO))
    if (data) {
      dispatch(AuthUser(data))
      setIsSignIn(true)
      if (data.roles.Admin) {
        setIsAdmin(true)
      }
    }
  }, [])
  const handleSignOut = () => {
    localStorage.clear("user_info")
    navigate("/auth")
  }
  const handleShow = ()=>{
    // return ()=> {
      dispatch(setShowCart)
    // }
  }
  return (
    <Navbar collapseOnSelect expand="lg" className='header__container'>
      <Container>
        <Navbar.Brand href="#home">
          <Image src={logo} id="company__logo" alt="logo" /> <span className='company__name'>Shopcart</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {
              isAdmin ?
                <>
                  <div className="nav-li">
                    <NavLink to="/admin/add-product">Add Product</NavLink>
                  </div>
                  <div className="nav-li">
                    <NavLink to="/admin/orders"> Orders</NavLink>
                  </div>
                  <div className="nav-li">
                    <NavLink to="/admin"> Home</NavLink>
                  </div>
                </>
                :
                <div className='header__dropdown'>
                  <HeaderDropDown />
                </div>

            }
          </Nav>

          <Dropdown className='dropdown__container'>
            <Dropdown.Toggle id="dropdown-basic">
              <Image src={user} alt='' />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <NavLink to="/profile" className="dropdown-item">Profile</NavLink>
              {
                isSignIn ?
                  <div className='dropdown-item' onClick={handleSignOut}>Sign Out</div>
                  :
                  <NavLink to={"/auth"} className="dropdown-item">Sign In</NavLink>
              }
            </Dropdown.Menu>
          </Dropdown>

          {/* 
          <NavLink to={"/cart"} className="nav-link cart">
            <FiShoppingCart />
          </NavLink>
           */}
          <button className='nav-link cart' onClick={()=>dispatch(setShowCart())}>
            <FiShoppingCart />
          </button>
         
        </Navbar.Collapse>

      </Container>
    </Navbar>
  )
}

export default Header