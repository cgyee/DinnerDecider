import React from 'react';

const TextButton = (props) => {
    const clickEvent = props.onClick || "";
    return (
        props.hasDisabled ?
            <button className="button-text" onClick={clickEvent} disabled={props.isDisabled}>{props.text}</button>:
            <button className="button-text" onClick={clickEvent} >{props.text}</button>

    )
}
export default TextButton;