import App from "../App";
import HomePage from "../Components/Home/HomePage";
import AuthForm from "../Components/commonComponents/AuthForm";

export const routers = [
    {
        path : "/auth",
        element : <AuthForm/>
    },
    {
        path: "/",
        element: <App />,
        children : [{
            index : true ,
            element : <HomePage/>
        }
        ]
    },

];