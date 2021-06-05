import React, { useState } from 'react'
import { Redirect, Route } from 'react-router'
import { isAuthenticated } from '../auth'

const PrivateRoute = ({ component: Component, path, redirect, ...rest }) => {
  console.log('🚀 ~ file: PrivateRoute.js ~ line 6 ~ PrivateRoute ~ rest', rest)
  const isLoggedIn = isAuthenticated()
  console.log(
    '🚀 ~ file: PrivateRoute.js ~ line 7 ~ PrivateRoute ~ isLoggedIn',
    isLoggedIn
  )
  return isLoggedIn ? (
    <Route {...rest} path={path} render={(routeProps) => <Component />}></Route>
  ) : (
    <Redirect to={redirect} />
  )
}

export default PrivateRoute
