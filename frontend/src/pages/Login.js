import React, { useState } from 'react';
import Inputfield from '../components/Inputfield';

const Login = () => {
    const postLogin = async () => {
        const options ={
            method:'POST',
            mode:'cors',
            headers: {
                'Content-type':'Application/json'
            },
            body: JSON.stringify({'does':'it', 'work':true})
        };
        fetch('/login/attempt', options);
        console.log("fetch");
    }
    const [emailField, setEmailField] = useState('')
    const [passwordFieldMain, setPasswordFieldMain] = useState('');
    return (
        <div className="form-login">
            <div>
                <div className='row' style={{'justifyContent':'center', 'padding':'0 0 100px 0'}}>
                    <span style={{'fontSize':'1.5rem'}}>Welcome</span>
                </div>
                <Inputfield className={'form-input'} placeholder={'Email'} updateParentState={setEmailField} />
                <Inputfield className={'form-input'} placeholder={'Password'} updateParentState={setPasswordFieldMain}/>
                <div className='d-grid gap-2'>
                    <button className='btn btn-primary' disabled={emailField && passwordFieldMain} onClick={postLogin}>Submit</button>
                    <a
                        className='btn'
                        href='http://localhost:8080/auth/login'  >
                        <img src='./static/ms-symbollockup_signin_dark_short.png' alt=''></img>
                    </a>
                </div>
            </div>
        </div>
    )
}
export default Login;