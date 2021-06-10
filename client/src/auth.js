import store from 'store-js'
import React, { createContext, useContext, useState, useMemo } from 'react'

/* create a context and Provider component  */
const context = createContext(false)
const { Provider } = context
const isLoggedIn = store.get('user')

/* Component to wrap children using with the user state */
function AuthProvider({ children }) {
    /* set the value of state and pass the state and setState function to children compoents */
    const [user, setUser] = useState(isLoggedIn)
    const value = useMemo(() => {
        return { user, setUser }
    }, [user])
    return <Provider value={value}>{children}</Provider>
}

/* get the state and setState function from context */
function useAuth() {
    const { user, setUser } = useContext(context)

    /* return the value of user */
    const isAuthenticated = () => {
        return user
    }

    /* set value of user state to false and update localStorage */
    const unAuthenticate = () => {
        store.set('user', false)
        setUser(false)
    }

    /* set value of user state to true and update localStorage */
    const authenticate = () => {
        store.set('user', true)
        setUser(true)
    }

    return { isAuthenticated, unAuthenticate, authenticate }
}
export { AuthProvider, useAuth }
