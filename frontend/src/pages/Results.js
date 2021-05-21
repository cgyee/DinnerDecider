import React, {useEffect, useState} from 'react'
import Result from '../components/Result';

const Results = (props) => {
    const URI_STRING = `api/Results/${props.history.location.state.pollId}`
    console.log("🚀 ~ file: Results.js ~ line 24 ~ Results ~ props.history.location.state", props.history.location.state);
    const [resturantInfo, setResturantInfo] = useState()

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
            const resturantInfo = await response.json()
            setResturantInfo(resturantInfo)
            console.log("🚀 ~ file: Results.js ~ line 20 ~ resturantInfo", resturantInfo)
        })()
    }, [setResturantInfo])
    return (
        <div className='container'>
            < Result {...resturantInfo} />
        </div>
    )
}

export default Results