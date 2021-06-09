import React from 'react'
import { Redirect, Route } from 'react-router'
import { useAuth } from '../auth'

const PrivateRoute = ({ component: Component, path, redirect, ...rest }) => {
    const { isAuthenticated } = useAuth()
    const isLoggedIn = isAuthenticated()
    return isLoggedIn ? (
        <Route
            {...rest}
            path={path}
            render={(routeProps) => <Component />}
        ></Route>
    ) : (
        <Redirect to={redirect} />
    )
}

export default PrivateRoute
