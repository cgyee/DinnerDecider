import React, {useEffect, useState} from 'react'
import Result from '../components/Result';

const Results = (props) => {
    const URI_STRING = `api/Results/${props.history.location.state.pollId}`
    const [resturantInfo, setResturantInfo] = useState({})

    useEffect(() =>{
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
            const resturantInfo = await response.json()
            setResturantInfo(resturantInfo)
        })()
    }, [setResturantInfo])
    return (
        <div className='container'>
            <Result {...resturantInfo} />
        </div>
    )
}

export default Results