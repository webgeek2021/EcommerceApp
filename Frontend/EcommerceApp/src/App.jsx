
import AuthForm from "./Components/commonComponents/AuthForm" ;
import Header from "./Components/commonComponents/Header";
import Footer from "./Components/commonComponents/Footer";
import { Outlet } from "react-router-dom";
import { useSelector  } from "react-redux";
import DisplayCart from "./Components/commonComponents/DisplayCart";
function App() {

  const showCart = useSelector(state => state.cart.showCart)

  return (
    <>
      <Header/>
      <Outlet/>
      {/* <Footer/> */}
      {
        showCart && <DisplayCart/>
      }
    </>
  )
}

export default App
