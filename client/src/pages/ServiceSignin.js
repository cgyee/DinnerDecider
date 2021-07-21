import React, { useState } from 'react'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../config/msalAuthConfig'
import Button from 'react-bootstrap/Button'

const ServiceSignin = () => {
    const { instance, accounts, inProgress } = useMsal()
    const [accessToken, setAccessToken] = useState(null)

    const name = accounts[0] && accounts[0].name

    function RequestAccessToken() {
        const request = {
            ...loginRequest,
            account: accounts[0]
        }

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance
            .acquireTokenSilent(request)
            .then((response) => {
                setAccessToken(response.accessToken)
                localStorage.setItem('token', response.accessToken)
            })
            .catch((e) => {
                instance.acquireTokenPopup(request).then((response) => {
                    setAccessToken(response.accessToken)
                    localStorage.setItem('error', e)
                })
            })
    }

    return (
        <>
            <h5 className="card-title">Welcome {name}</h5>
            {accessToken ? (
                <p>Access Token Acquired!</p>
            ) : (
                <Button variant="secondary" onClick={RequestAccessToken}>
                    Request Access Token
                </Button>
            )}
        </>
    )
}

export default ServiceSignin
