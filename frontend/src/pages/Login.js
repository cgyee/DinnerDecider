import React, { useState } from 'react';
import Inputfield from '../components/Inputfield';
import TextButton from '../components/TextButton';

const Login = () => {
    const postLogin = () => {
        const options ={
            method:'POST',
            mode:'cors',
            headers: {
                'Content-type':'Application/json'
            },
            body: JSON.stringify({'does':'it', 'work':true})
        };
        // fetch('/login/attempt', options);
        fetch('/api');
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
                <Inputfield className={'form-input'} placeholder={'Email'} updateParentState={setPasswordFieldMain} />
                <Inputfield className={'form-input'} placeholder={'Password'} updateParentState={setPasswordFieldMain}/>
                <a
                    href='http://localhost:8080/auth/login'  
                    style={{minWidth:'56px'}}>
                    <img src='./static/ms-symbollockup_signin_dark_short.png' alt=''></img>
                </a>
            </div>
        </div>
    )
}
export default Login;