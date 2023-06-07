import App from "../App";
import HomePage from "../Components/Home/HomePage";
import AuthForm from "../Components/commonComponents/AuthForm";
import AdminPanel from "../Components/admin/AdminPanel";
import ViewOrders from "../Components/admin/ViewOrders";
import AddProduct from "../Components/admin/AddProduct";
import ProductDisplay from "../Components/admin/ProductDisplay";
import UserProductDisplay from "../Components/commonComponents/ProductDisplay";
import { requireAuth ,requireAdminAuth} from "./requireAuth";
import { useLocation ,Navigate} from "react-router-dom";
import ProfilePage from "../Components/ProfilePage/ProfilePage";
import ShippingDetailForm from "../Components/ProfilePage/ShippingDetailForm";
import ProfileForm from "../Components/ProfilePage/ProfileForm";
import BillingPage from "../Components/BillingPage/BillingPage";

const ProtectedRoute = ({ element }) => {
    const isAuthenticated = requireAuth()
    const location = useLocation();

    if (!isAuthenticated && location.pathname !== "/auth") {
        return <Navigate to="/" />;
    }

    return element;
};

const ProtectAdminRoute = ({element}) =>{

    const isAuth = requireAdminAuth();
    const location = useLocation
    console.log(isAuth , location)
    if(!isAuth && location.pathname !== "/auth"){
        return <Navigate to="/" />
    }
    return element
}
export const routers = [
    {
        path: "/auth",
        element: <AuthForm />
    },

    {
        path: "/",
        element: <App />,
        children: [{
            index: true,
            element: <HomePage />
        }, 
        {
            path : "/profile",
            element : <ProtectedRoute element={<ProfilePage/>}/>,
            children : [
            {
                index : true,
                element : <ProtectedRoute element={<ProfileForm/>}/>
            },
            {
                path : "/profile/shippingDetails",
                element : <ProtectedRoute element={<ShippingDetailForm/>}/>
            }
        ]
        },
        {
            path: "/show/product/:id",
            element: <UserProductDisplay />
        },
        {
            path: "/admin",
            element: <ProtectAdminRoute element={<AdminPanel />} />,
        },
        {
            path: "/admin/add-product",
            element: <ProtectAdminRoute element={<AddProduct />} />
        },
        {
            path: "/admin/product/:id",
            element: <ProtectAdminRoute element={<ProductDisplay />} />,
        },
        {
            path: "/admin/orders",
            element: <ProtectAdminRoute element={<ViewOrders />} />
        },
        {
            path : "/billing",
            element : <ProtectedRoute element={<BillingPage/>}/>
        }
        ]
    },

];