import React, { useEffect, useState } from 'react'
import Result from '../components/Result'

const Results = (props) => {
    const URI_STRING = `api/Poll/Results/${props.history.location.state.pollId}`
    console.log(
        '🚀 ~ file: Results.js ~ line 24 ~ Results ~ props.history.location.state',
        props.history.location.state
    )
    const [resturantInfo, setResturantInfo] = useState()

    //Add H1/heders displaying selected Categories
    useEffect(() => {
        ;(async () => {
            const response = await fetch(`/${URI_STRING}`, {
                method: 'GET',
                mode: 'cors'
            })
            const resturantInfo = await response.json()
            setResturantInfo(resturantInfo)
            console.log(
                '🚀 ~ file: Results.js ~ line 20 ~ resturantInfo',
                resturantInfo
            )
        })()
    }, [setResturantInfo])
    return (
        <div className="container">
            {resturantInfo && <Result {...resturantInfo} />}
        </div>
    )
}

export default Results
