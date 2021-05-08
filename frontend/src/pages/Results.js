import React from 'react'
import Result from '../components/Result';

const Results = (props) => {
    console.log(props.history.location.state)
    const data = props.history.location.state
    const [resturantSelection1, resturantSelection2, resturantSelection3] = data
    const URI_STRING = `api/resturant/`
    // (async () => {
    //     const response = await fetch('/api/resturant', 
    //     {
    //         method: 'GET',
    //         mode:'cors',
    //         headers: {
    //             'Content-type':'Application/json'
    //         }
    //     })
    //     console.log(response) 
    // })()
    return (
        <div className='container'>
            <Result />
        </div>
    )
}

export default Results