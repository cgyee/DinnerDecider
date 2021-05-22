import React, {useState, useEffect} from 'react'
import pusher from '../pusher';
/* Rename me! */
const PollCountPage = () => {
    const [count, setCount] = useState(0)
    console.log("🚀 ~ file: PollCountPage.js ~ line 6 ~ PollCountPage ~ count", count)
    
    const URI_STRING = `api/Callvote/60a1bd72b08eb61ca28398be`
    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:5000/${URI_STRING}`,
            {
                method:'GET',
                mode:'cors'
            })
            const data = await response.json()
            console.log("🚀 ~ file: PollCountPage.js ~ line 17 ~ data", data)
            setCount(data.count)
        })();
    },[])

    useEffect(()=> {
        const channel = pusher.subscribe('DinnerDeciderDemo')
        channel.bind('addVote', (vote) => {           
            console.log("🚀 ~ file: PollCountPage.js ~ line 12 ~ channel.bind ~ vote", vote)
            setCount(vote.count)
        });
    }, [setCount])
    
    return (
        <div className='container'>
            <div className="card" style={{width: "18rem", margin:'auto'}}>
                <h3 className='border-bottom p-3' style={{textAlign:'center'}}>VOTES IN</h3>
                <div className='col-10 row flex-column justify-content-end align-content-center' style={{width:'15rem', height:'12rem', margin:'auto'}}>
                    <span className='text-center' style={{fontSize:'7rem'}}>{count}</span>
                    <span className='col-4' style={{border:'4px solid black', borderBottomWidth: '1px 0', position:'absolute',left:'50%', transform:'translatex(-50%)', top:'68%' }}></span>
                </div>
                <div className="row gx-0 flex-column p-3 align-content-center border-top">
                    <button className='btn btn-primary col-10'>END VOTING</button>
                </div>
            </div>
        </div>
    )
}

export default PollCountPage