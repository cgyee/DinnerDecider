import React, { useState, useEffect, useContext } from 'react'
import Result from '../components/Result'
import PollBlock from '../components/Pollblock'
import { useHistory } from 'react-router-dom'
import isValidZipCode from 'is-valid-zipcode'
import { baseUrl } from '../urlpath'

const Dashboard = () => {
    const history = useHistory()
    const [resturantInfo, setResturantInfo] = useState([])
    const [zipCode, setZipCode] = useState('')
    const [pollName, setPollName] = useState('')
    const [onGoingPolls, setOngoingPolls] = useState([])
    console.log(
        '🚀 ~ file: Dashboard.js ~ line 13 ~ Dashboard ~ onGoingPolls',
        onGoingPolls
    )
    const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-type': 'Application/json' }
    }

    const onChange = (e, cb) => cb(e.target.value)
    const createNewPoll = async () => {
        const zip = zipCode
        const name = pollName
        const response = await fetch(`${baseUrl}/api/createNewPoll`, {
            ...options,
            body: JSON.stringify({ zip, name })
        })
        const data = await response.json()
        const { id } = data
        setOngoingPolls([...onGoingPolls, { address: zip, name, _id: id }])

        console.log(
            '🚀 ~ file: Dashboard.js ~ line 45 ~ createNewPoll ~ data',
            data
        )
    }
    const deletePoll = async (id) => {
        const response = await fetch(`${baseUrl}/api/Poll/Delete/${id}`, {
            ...options,
            method: 'DELETE',
            body: JSON.stringify({ id })
        })
        console.log(
            '🚀 ~ file: Dashboard.js ~ line 48 ~ deletePoll ~ response',
            response
        )
        if (response.status == 200) {
            setOngoingPolls(onGoingPolls.filter((poll) => poll._id != id))
        }
        const data = await response.json()
    }

    useEffect(() => {
        ;(async () => {
            const response = await fetch(
                `http://localhost:5000/api/Poll/Results`,
                {
                    ...options,
                    method: 'GET'
                }
            )
            const { poll } = await response.json()
            const resturantInfo = poll
            console.log(
                '🚀 ~ file: Dashboard.js ~ line 61 ~ ; ~ resturantInfo',
                resturantInfo
            )
            // setResturantInfo(resturantInfo)
        })()
        ;(async () => {
            const response = await fetch(`${baseUrl}/api/Poll/getPolls`, {
                ...options,
                method: 'GET'
            })
            const data = await response.json()
            const { polls } = data

            console.log('🚀 ~ file: Dashboard.js ~ line 63 ~ data', data.polls)
            polls && setOngoingPolls([...polls.filter((p) => !p.isComplete)])
        })()
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
                        onClick={() => deletePoll(poll._id)}
                    />
                ))}

            {/* Results section */}
            {resturantInfo &&
                resturantInfo.map((resturant) => (
                    <div
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
                            <button className="btn btn-danger w-50">
                                <i className="far fa-minus-square"></i>
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    )
}
export default Dashboard
