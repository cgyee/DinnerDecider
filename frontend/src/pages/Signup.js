import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import Inputfield from '../components/Inputfield';
import TextButton from '../components/TextButton';

const Signup = () => {
    const [email, setEmail] = useState('')
    const [passwordFieldMain, setPasswordFieldMain] = useState('');
    const [passwordFieldSecondary, setPasswordFieldSecondary] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const history = useHistory()

    useEffect(() => {
        (email && (passwordFieldMain === passwordFieldSecondary)) ? setIsButtonDisabled(false) : setIsButtonDisabled(true);
    }, [email, passwordFieldMain, passwordFieldSecondary]);

    const onClick = async () => {
        const options ={
            method:'POST',
            mode:'cors',
            headers: {
                'Content-type':'Application/json'
            },
            body: JSON.stringify({email, password:passwordFieldMain})
        };
        const response  = await fetch('http://localhost:5000/auth/local/signup', options);
        if(response.status === 201) {
            history.push({
                pathname:'/'
            })
        } else {
            const {message}  = await response.json()
            console.log("🚀 ~ file: Signup.js ~ line 33 ~ onClick ~ message", message)
            alert(message)
        }
        console.log("🚀 ~ file: Signup.js ~ line 25 ~ onClick ~ response", response)
    }
    return (
        <div className="form-login">
            <div>
                <div className='row' style={{'justifyContent':'center', 'padding':'0 0 100px 0'}}>
                    <span style={{'fontSize':'1.5rem'}}>Signup</span>
                </div>
                <Inputfield className={'form-input'} placeholder={'Email'}  type='email' updateParentState={setEmail}/>
                <Inputfield className={'form-input'} placeholder={'Password'} type={'password'} updateParentState={setPasswordFieldMain}/>
                <Inputfield className={'form-input'} placeholder={'Password'} type={'password'} updateParentState={setPasswordFieldSecondary}/>
                <TextButton text={'Login'} hasDisabled={true} isDisabled={isButtonDisabled} onClick={onClick}/>
            </div>
        </div>
    )
}
export default Signup;