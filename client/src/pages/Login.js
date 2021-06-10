import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Inputfield from '../components/Inputfield'
import { useAuth } from '../auth'
import { SignInButton } from '../components/MsalSigninButton'
import store from 'store-js'

const Login = () => {
    const { authenticate } = useAuth()
    const postLogin = async () => {
        const options = {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-type': 'Application/json'
            }
        }
        const response = await fetch('auth/local/login', {
            ...options,
            body: JSON.stringify({
                email: emailField,
                password: passwordFieldMain
            })
        })
        console.log(
            '🚀 ~ file: Login.js ~ line 23 ~ postLogin ~ response',
            response
        )
        if (response.status === 200) {
            //If successful store the token in localStorage
            // store.set('token', data.token)
            authenticate()
            history.push({
                pathname: '/Dashboard'
            })
        } else {
            const { message } = await response.json()
            alert(message)
        }
    }
    const [emailField, setEmailField] = useState('')
    const [passwordFieldMain, setPasswordFieldMain] = useState('')
    const [buttonIsDisabld, setButtonIsDisabled] = useState(true)
    const history = useHistory()
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
