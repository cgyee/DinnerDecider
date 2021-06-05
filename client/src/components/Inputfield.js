import React, {useState, useEffect} from 'react';

const Inputfield = (props) => {
    const [fieldInput, setFieldInput] = useState('');
    const updateParentState = props.updateParentState
    useEffect(()=>{
        updateParentState(fieldInput)
    }, [fieldInput])
    return (
        props.type === 'email' ?
            <input 
                className={props.className}
                placeholder={props.placeholder} 
                type={props.email} 
                onChange={(e) => setFieldInput(e.target.value)}
                value={fieldInput}    
                required>
            </input>:
            <input 
                className={props.className} 
                placeholder={props.placeholder}
                type={props.type}
                onChange={(e) => {setFieldInput(e.target.value);}}
                value={fieldInput}
                required>
            </input>
        
    )
}
export default Inputfield