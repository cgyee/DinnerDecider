import React from 'react'
import Result from '../components/Result';

const Results = (props) => {
    const URI_STRING = `api/Results/${props.history.location.state.pollId}`
    console.log("🚀 ~ file: Results.js ~ line 24 ~ Results ~ props.history.location.state", props.history.location.state);

    (async () => {
        const response = await fetch(`http://localhost:5000/${URI_STRING}`, 
        {
            method: 'GET',
            mode:'cors',
            headers: {
                'Content-type':'Application/json'
            }
        });
        console.log(response) 
    })()
    return (
        <div className='container'>
            <Result />
        </div>
    )
}

export default Results