import React, {useState, useEffect} from 'react'
import {baseUrl} from '../urlpath'

const Dashboard = () => {
    const [myId, setMyId] = useState()
    useEffect(()=>{
        (async ()=>{
            const url = `${baseUrl}/auth/local/login`
            console.log("🚀 ~ file: Dashboard.js ~ line 9 ~ url", url)
            const response = await fetch(url, {
                method: 'GET',
                mode:'cors',
                credentials:'include'
            })
            const {id, ...rest} = await response.json()
            if(id) {
                console.log("🚀 ~ file: Dashboard.js ~ line 9 ~ id", id)
                setMyId(myId)
            }
            else {
                console.log("🚀 ~ file: Dashboard.js ~ line 8 ~ response", response)            
            }
        })()
    }, [setMyId])

    return (
        <div className='container'>
            {myId &&
            <h1>{myId}</h1>}
        </div>
    )

}
export default Dashboard