import React from 'react'
import { Navbar, Nav, NavDropdown, Container, Image, Dropdown } from "react-bootstrap";
import logo from "../../assets/Icons/logo.svg";
import userImage from "../../assets/Icons/user.jpg";
import HeaderDropDown from './HeaderDropDown';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { USER_INFO } from '../../utils/constants';
import { AuthUser, LogOutUser } from '../../ReduxStore/slices/authSlice';
import DisplayCart from './DisplayCart';
import { FiShoppingCart } from 'react-icons/fi';
import { setShowCart } from '../../ReduxStore/slices/cartSlice';
import Cookie from "js-cookie";
const Header = () => {

  const [user, setUser] = React.useState(null)
  React.useEffect(()=>{
    const user = Cookie.get(USER_INFO)
    if(user){
      setUser(JSON.parse(user))
    }
  },[])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // React.useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem(USER_INFO))
  //   if (data) {
  //     dispatch(AuthUser(data))
  //     setIsSignIn(true)
  //     if (data.isAdmin) {
  //       setIsAdmin(true)
  //     }
  //   }
  // }, [])
  const handleSignOut = () => {
    dispatch(LogOutUser())
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
              user?.isAdmin ?
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
              <Image src={user?.profileImage || userImage} alt='' />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <NavLink to="/profile" className="dropdown-item">Profile</NavLink>
              {
                user?.token ?
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