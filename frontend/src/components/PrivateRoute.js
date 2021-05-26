import React, {useState} from 'react'
import { Redirect, Route } from 'react-router'
import {isAuthenticated} from '../auth'

const PrivateRoute = ({component:Component, ...rest}) => {
    const isLoggedIn = isAuthenticated()
    console.log("🚀 ~ file: PrivateRoute.js ~ line 7 ~ PrivateRoute ~ isLoggedIn", isLoggedIn)
    return (
        isLoggedIn ?
        (<Route
            // {...rest}
            render={ routeProps =>
                <Component/>}>
        </Route>)
        :
        <Redirect to='/Login' />
    )
}

export default PrivateRoute