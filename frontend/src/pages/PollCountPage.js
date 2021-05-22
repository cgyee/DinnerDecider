import React from 'react'
/* Rename me! */
const PollCountPage = () => {
    return (
        <div className='container'>
            <div className="card" style={{width: "18rem", margin:'auto'}}>
                <h3 className='border-bottom p-3' style={{textAlign:'center'}}>VOTES IN</h3>
                <div className='col-10 row flex-column justify-content-end align-content-center' style={{width:'15rem', height:'12rem', margin:'auto'}}>
                    <span className='text-center' style={{fontSize:'7rem'}}>0</span>
                    <span className='col-4' style={{border:'2px solid black', borderBottomWidth: '1px 0', position:'absolute',left:'50%', transform:'translatex(-50%)', top:'68%' }}></span>
                </div>
                <div className="row gx-0 flex-column p-3 align-content-center border-top">
                    <button className='btn btn-primary col-10'>END</button>
                </div>
            </div>
        </div>
    )
}

export default PollCountPage