import React from 'react'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../config/msalAuthConfig'

function handleLogin(instance) {
    instance.loginPopup(loginRequest).catch((e) => {
        console.error(e)
    })
}

/**
 * Renders a button which, when selected, will redirect the page to the login prompt
 */
export const SignInButton = () => {
    const { instance } = useMsal()

    return (
        <button
            variant="secondary"
            className="ml-auto btn btn-primary"
            onClick={() => handleLogin(instance)}
        >
            Sign in using Redirect
        </button>
    )
}
