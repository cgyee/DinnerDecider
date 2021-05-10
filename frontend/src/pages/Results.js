import React from 'react'
import Result from '../components/Result';

const Results = (props) => {
    const URI_STRING = `api/Results/`
    console.log("🚀 ~ file: Results.js ~ line 24 ~ Results ~ props.history.location.state", props.history.location.state)

    /* (async () => {
        const response = await fetch('/api/resturant', 
        {
            method: 'GET',
            mode:'cors',
            headers: {
                'Content-type':'Application/json'
            }
        })
        console.log(response) 
    })() */
    return (
        <div className='container'>
            <Result />
        </div>
    )
}

export default Results