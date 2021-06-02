import React from 'react'

const Result = (props) => {
    console.log(
        '🚀 ~ file: Result.js ~ line 23 ~ Result ~ props.display_address',
        props.display_address
    )
    let stars = new Array(5).fill(<i class="fas fa-star col"></i>)
    for (let i = 0; i < 5 - Math.floor(props.rating); i++) {
        stars[Math.floor(props.rating) - i] = <i class="far fa-star col"></i>
    }
    if (props.rating % Math.floor(props.rating) >= 0.5) {
        stars[Math.floor(props.rating)] = (
            <i class="fas fa-star-half-alt col"></i>
        )
    }
    return (
        <div className="card mb-3" style={{ margin: 'auto' }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img
                        src={props.image_url}
                        alt="..."
                        style={{ height: '100%', width: '100%' }}
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{props.name}</h5>
                        <div className="row">
                            <h6 className="col">
                                Reviews({props.review_count})
                            </h6>
                            <h6 className="col">
                                {props.rating}{' '}
                                <div style={{ display: 'contents' }}>
                                    {stars}
                                </div>
                            </h6>
                        </div>
                        <h7 className="card-subtitle text-muted">
                            {props.display_address &&
                                props.display_address.join(', ')}
                        </h7>
                        <p className="card-text">
                            <small className="text-muted">{props.phone}</small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Result
