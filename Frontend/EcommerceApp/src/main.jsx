import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux'
import store from "./ReduxStore/store.jsx"

import "./Sass/style.css"
import { routers } from "./utils/routes.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter(routers);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>

      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>;
    </Provider>
  </React.StrictMode>,
)
