import React, { useState, useEffect, useContext } from 'react'
import Result from '../components/Result'
import PollBlock from '../components/Pollblock'
import { useHistory } from 'react-router-dom'
import isValidZipCode from 'is-valid-zipcode'

const Dashboard = () => {
    const history = useHistory()
    const [resturantInfo, setResturantInfo] = useState([])
    const [zipCode, setZipCode] = useState('')
    const [pollName, setPollName] = useState('')
    const [onGoingPolls, setOngoingPolls] = useState([])

    const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-type': 'Application/json' }
    }

    const onChange = (e, cb) => cb(e.target.value)
    const getResturants = async () => {
        const response = await fetch(`/api/Poll/Results`, {
            ...options,
            method: 'GET'
        })
        const { polls } = await response.json()
        const resturantInfo = polls
        return resturantInfo
    }

    const getPolls = async () => {
        const response = await fetch(`/api/Poll/getPolls`, {
            ...options,
            method: 'GET'
        })
        const data = await response.json()
        const { polls } = data
        return polls
    }

    const createNewPoll = async () => {
        const zip = zipCode
        const name = pollName
        const response = await fetch(`/api/Poll/createNewPoll`, {
            ...options,
            body: JSON.stringify({ zip, name })
        })
        const data = await response.json()
        const { id } = data
        setOngoingPolls([...onGoingPolls, { address: zip, name, _id: id }])
    }
    const deletePoll = async (state, setState, id) => {
        try {
            const response = await fetch(`/api/Poll/Delete/${id}`, {
                ...options,
                method: 'DELETE'
            })
            if (response.ok) {
                setState(state.filter((poll) => poll._id != id))
            }
            const data = await response.json()
        } catch (error) {
            console.log(
                '🚀 ~ file: Dashboard.js ~ line 69 ~ deletePoll ~ error',
                error
            )
        }
    }

    useEffect(() => {
        getResturants().then((resturants) => setResturantInfo(resturants))
        getPolls().then(
            (polls) =>
                polls &&
                setOngoingPolls([...polls.filter((p) => !p.isComplete)])
        )
    }, [setResturantInfo, setOngoingPolls])

    return (
        <div className="container">
            {/* Create new poll section */}
            <div
                className="input-group mb-3 w-75"
                style={{ marginLeft: 'auto', marginRight: 'auto' }}
            >
                <input
                    type="text"
                    className="form-control"
                    placeholder="Poll Name"
                    onChange={(e) => onChange(e, setPollName)}
                ></input>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Zip"
                    onChange={(e) => onChange(e, setZipCode)}
                ></input>
                <button
                    className="btn btn-primary"
                    disabled={!isValidZipCode(zipCode) || !pollName}
                    onClick={createNewPoll}
                >
                    <i className="fas fa-plus-circle"></i>
                </button>
            </div>
            {/* Current Polling  Section*/}
            {onGoingPolls &&
                onGoingPolls.map((poll) => (
                    <PollBlock
                        key={poll._id}
                        {...poll}
                        onClick={() =>
                            deletePoll(onGoingPolls, setOngoingPolls, poll._id)
                        }
                        remove={() =>
                            setOngoingPolls((prevState) =>
                                prevState.filter((p) => p._id != poll._id)
                            )
                        }
                        updateParentState={setResturantInfo}
                    />
                ))}

            {/* Results section */}
            {resturantInfo &&
                resturantInfo.map((resturant) => (
                    <div
                        key={resturant._id}
                        className="w-75 p-3"
                        style={{
                            margin: '10px auto',
                            border: '1px solid rgba(0,0,0,.125)',
                            borderRadius: '.25rem'
                        }}
                    >
                        <Result {...resturant} />
                        <div className="btn-group w-100">
                            <button className="btn btn-success w-50">
                                <i className="fas fa-info-circle"></i>
                            </button>
                            <button
                                className="btn btn-danger w-50"
                                onClick={() =>
                                    deletePoll(
                                        resturantInfo,
                                        setResturantInfo,
                                        resturant._id
                                    )
                                }
                            >
                                <i className="far fa-minus-square"></i>
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    )
}
export default Dashboard
