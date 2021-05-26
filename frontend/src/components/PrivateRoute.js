import React, {useState} from 'react'
import { Redirect, Route } from 'react-router'
import {isLoggedIn} from '../auth'

const PrivateRoute = ({component:Component, ...rest}) => {
    return (
        <Route
            // {...rest}
            render={ routeProps => 
                isLoggedIn.then(
                    
                )
            }>
        </Route>
    )
}

export default PrivateRoute