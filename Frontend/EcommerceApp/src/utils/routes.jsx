import App from "../App";
import HomePage from "../Components/Home/HomePage";
import AuthForm from "../Components/commonComponents/AuthForm";
import AdminPanel from "../Components/admin/AdminPanel";
import ViewOrders from "../Components/admin/ViewOrders";
import AddProduct from "../Components/admin/AddProduct";
import ProductDisplay from "../Components/admin/ProductDisplay";
import UserProductDisplay from "../Components/commonComponents/ProductDisplay"; 
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
        },{
            path : "/show/product/:id",
            element : <UserProductDisplay/>
        },
        {
            path: "/admin",
            element: <AdminPanel />,
        },
        {
            path: "/admin/add-product",
            element: <AddProduct />
        },
        {
            path : "/admin/product/:id",
            element : <ProductDisplay/>,
        },
        {
            path: "/admin/orders",
            element: <ViewOrders />
        },

        ]
    },

];