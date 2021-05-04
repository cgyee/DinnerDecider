import React from 'react'

const Result = () => {

    return (
        <div className="card mb-3" style={{"max-width":"540px", "margin":"auto"}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="./static/unnamed.jpeg" alt="..." style={{'height': '100%' ,'width': '100%'}}/>
                </div>
                <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">Resturant Name</h5>
                    <h6 className='card-subtitle text-muted'>Location</h6>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Result