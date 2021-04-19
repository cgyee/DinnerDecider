import React from 'react';
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
    return (
        <div className="form-login">
            <div>
                <div className='row' style={{'justifyContent':'center', 'padding':'0 0 100px 0'}}>
                    <span style={{'fontSize':'1.5rem'}}>Welcome</span>
                </div>
                <Inputfield className={'form-input'} placeholder={'Email'} />
                <Inputfield className={'form-input'} placeholder={'Password'}/>
                <div
                    onClick={() => fetch('http://localhost:8080/api/login', {method:'GET', mode:'cors'} )}  
                    style={{minWidth:'56px'}}>
                    <img src='./static/ms-symbollockup_signin_dark_short.png' alt=''></img>
                </div>
            </div>
        </div>
    )
}
export default Login;