import store from 'store-js'
import React, { createContext, useContext, useState, useMemo } from 'react'

const context = createContext(false)
const { Provider } = context
const isLoggedIn = store.get('user')
console.log('🚀 ~ file: auth.js ~ line 4 ~ isLoggedIn', isLoggedIn)

function AuthProvider({ children }) {
    const [user, setUser] = useState(isLoggedIn)
    const value = useMemo(() => {
        return { user, setUser }
    }, [user])
    return <Provider value={value}>{children}</Provider>
}

function useAuth() {
    const { user, setUser } = useContext(context)

    const isAuthenticated = () => {
        return user
    }

    const unAuthenticate = () => {
        store.set('user', false)
        setUser(false)
    }

    const authenticate = () => {
        store.set('user', true)
        setUser(true)
    }

    return { isAuthenticated, unAuthenticate, authenticate }
}
export { AuthProvider, useAuth }
