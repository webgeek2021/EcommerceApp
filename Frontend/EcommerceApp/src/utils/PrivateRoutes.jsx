import React from 'react';
import { requireAuth } from './requireAuth';
import {Redirect , Route} from "react-router-dom";

const PrivateRoutes = (props) => {
    const { component: Component, children, render, ...rest } = props
    
  return (
    <Route
        {...rest}
        render = {
            ()=>{
                requireAuth() ?
                <Component />
                :
                <Redirect to="/auth"/>
            }
        }

        
    />
  )
}

export default PrivateRoutes