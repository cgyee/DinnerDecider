import React, {useState} from 'react';

const Inputfield = (props) => {

    const [passwordFieldInput, setPasswordFieldInput] = useState('');
    console.log(props)

    return (
        props.type === 'email' ?
            <input className={props.className} placeholder={props.placeholder} type={props.email} required></input>:
            <input 
                className={props.className} 
                placeholder={props.placeholder}
                type={props.type}
                onChange={(e) => {setPasswordFieldInput(e.target.value);}}
                value={passwordFieldInput}
                required>
            </input>
        
    )
}
export default Inputfield