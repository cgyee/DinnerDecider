import React, {useState, useEffect} from 'react';
import Inputfield from '../components/Inputfield';
import TextButton from '../components/TextButton';

const Signup = () => {
    const [passwordFieldMain, setPasswordFieldMain] = useState('');
    const [passwordFieldSecondary, setPasswordFieldSecondary] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        passwordFieldMain === passwordFieldSecondary ? setIsButtonDisabled(false) : setIsButtonDisabled(true);
    }, [passwordFieldMain, passwordFieldSecondary]);

    return (
        <div className="form-login">
            <form>
                <div className='row' style={{'justifyContent':'center', 'padding':'0 0 100px 0'}}>
                    <span style={{'fontSize':'1.5rem'}}>Signup</span>
                </div>
                <Inputfield className={'form-input'} placeholder={'Email'}  type='email'/>
                <Inputfield className={'form-input'} placeholder={'Password'} type={'password'} updateParentState={setPasswordFieldMain}/>
                <Inputfield className={'form-input'} placeholder={'Password'} type={'password'} updateParentState={setPasswordFieldSecondary}/>
                <TextButton text={'Login'} hasDisabled={true} isDisabled={isButtonDisabled}/>
            </form>
        </div>
    )
}
export default Signup;