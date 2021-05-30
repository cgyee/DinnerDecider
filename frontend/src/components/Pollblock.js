import React from 'react'
import { useHistory } from 'react-router-dom'

const PollBlock = (props) => {
    const history = useHistory()
    const goToPollVote = (id) =>
        history.push({ pathname: `/Vote/${id}`, state: { id } })
    const goToPollResults = (id) =>
        history.push({ pathname: `/Results/${id}`, state: { id } })
    return (
        <div className="row w-75 mx-auto border p-3 mb-3">
            <span
                className="text-center align-middle col-4"
                style={{
                    border: '1px solid rgba(0,0,0,.125)',
                    borderRadius: '.25rem'
                }}
            >
                {props.name}
            </span>
            <div className="btn-group col">
                <button className="btn btn-outline-primary" data-id={props._id}>
                    <i className="far fa-clipboard"></i>
                    Share
                </button>
                <button
                    onClick={(e) => goToPollVote(props._id)}
                    className="btn btn-outline-primary"
                >
                    Vote
                </button>
                <button
                    disabled={!props.isComplete}
                    onClick={(e) => goToPollResults(props._id)}
                    className="btn btn-outline-danger"
                >
                    End
                </button>
                <button className="btn btn-outline-danger">
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </div>
    )
}

export default PollBlock
