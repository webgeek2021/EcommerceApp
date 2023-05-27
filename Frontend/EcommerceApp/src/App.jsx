
import AuthForm from "./Components/commonComponents/AuthForm" ;
import Header from "./Components/commonComponents/Header";
import Footer from "./Components/commonComponents/Footer";
import { Outlet } from "react-router-dom";
function App() {

  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
   
    </>
  )
}

export default App
