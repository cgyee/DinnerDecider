import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Inputfield from '../components/Inputfield'
import { authenticate } from '../auth'

const Login = () => {
    const postLogin = async () => {
        const options = {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-type': 'Application/json'
            },
            body: JSON.stringify({
                email: emailField,
                password: passwordFieldMain
            })
        }
        const response = await fetch('/auth/local/login', options)
        console.log(
            '🚀 ~ file: Login.js ~ line 16 ~ postLogin ~ response',
            response
        )
        if (response.status === 200) {
            authenticate()
            history.push({
                pathname: '/Address'
            })
        } else {
            const { message } = await response.json()
            // console.log("🚀 ~ file: Login.js ~ line 23 ~ postLogin ~ message", message)
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
                    <a className="btn" href="http://localhost:8080/auth/login">
                        <img
                            src="./static/ms-symbollockup_signin_dark_short.png"
                            alt=""
                        ></img>
                    </a>
                </div>
            </div>
        </div>
    )
}
export default Login
