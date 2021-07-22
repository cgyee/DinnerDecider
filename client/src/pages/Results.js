import React, { useEffect, useState } from 'react'
import Result from '../components/Result'

const Results = (props) => {
    const URI_STRING = `api/Poll/Results/${props.history.location.state.id}`
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
        })()
    }, [setResturantInfo])
    return (
        <div className="container">
            {resturantInfo && <Result {...resturantInfo} />}
        </div>
    )
}

export default Results
