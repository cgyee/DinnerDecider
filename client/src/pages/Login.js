import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Inputfield from '../components/Inputfield'
import { SignInButton } from '../components/MsalSigninButton'
import { useIsAuthenticated } from '@azure/msal-react'
import { useMsal } from '@azure/msal-react'
import { InteractionStatus } from '@azure/msal-browser'
import { loginRequest } from '../config/msalAuthConfig'

const Login = () => {
    const { instance, accounts, inProgress } = useMsal()
    const [accessToken, setAccessToken] = useState(null)
    const isAuthenticated = useIsAuthenticated()
    const [emailField, setEmailField] = useState('')
    const [passwordFieldMain, setPasswordFieldMain] = useState('')
    const [buttonIsDisabld, setButtonIsDisabled] = useState(true)
    const history = useHistory()
    const { authenticate } = useAuth()

    const postLogin = async () => {
        const response = await fetch('/auth/local/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-type': 'Application/json'
            },
            body: JSON.stringify({
                email: emailField,
                password: passwordFieldMain
            })
        })
        if (response.status == 200) {
            authenticate()
            history.push({
                pathname: '/Dashboard'
            })
        } else {
            const { message } = await response.json()
            alert(message)
        }
    }

    useEffect(() => {
        const request = {
            ...loginRequest,
            account: accounts[0]
        }

        if (isAuthenticated && inProgress === InteractionStatus.None) {
            instance
                .acquireTokenSilent(request)
                .then((response) => {
                    setAccessToken(response.accessToken)
                    sessionStorage.setItem('token', response.accessToken)

                    /* Send token to backend to call ms graph for user information */
                    fetch('/auth/azure/login', {
                        method: 'POST',
                        mode: 'cors',
                        credentials: 'include',
                        headers: { 'Content-type': 'Application/json' },
                        body: JSON.stringify({
                            accessToken: response.accessToken
                        })
                    })
                })
                .catch((e) => {
                    instance.acquireTokenPopup(request).then((response) => {
                        setAccessToken(response.accessToken)
                        sessionStorage.setItem('error', e)
                    })
                })
        }
    }, [inProgress, isAuthenticated, accounts, instance])

    useEffect(() => {
        setButtonIsDisabled(!(emailField && passwordFieldMain))
    }, [emailField, passwordFieldMain])
    return (
        <div className="form-login">
            <div>
                <div
                    className="row"
                    style={{ justifyContent: 'center', padding: '0 0 100px 0' }}
                >
                    <span style={{ fontSize: '1.5rem' }}>Welcome</span>
                </div>
                <Inputfield
                    className={'form-input'}
                    placeholder={'Email'}
                    type="email"
                    updateParentState={setEmailField}
                />
                <Inputfield
                    className={'form-input'}
                    placeholder={'Password'}
                    type="password"
                    updateParentState={setPasswordFieldMain}
                />
                <div className="d-grid gap-2">
                    <button
                        className="btn btn-primary"
                        disabled={buttonIsDisabld}
                        onClick={postLogin}
                    >
                        Submit
                    </button>
                    {/* URI is incorrect! update to use proper endpoint! */}
                    {/* <button className="btn">
                        <img
                            src="./static/ms-symbollockup_signin_dark_short.png"
                            alt=""
                        ></img>
                    </button> */}
                    <SignInButton />
                </div>
            </div>
        </div>
    )
}
export default Login
