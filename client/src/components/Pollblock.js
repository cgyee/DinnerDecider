import React, { useEffect, useState } from 'react'
import { Row, Button, ButtonGroup } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import pusher from '../config/pusher'

const PollBlock = (props) => {
    //TODO update me to use variable for paths!
    const url = `http://localhost:3000/Vote/${props._id}`
    const history = useHistory()
    const [text, setText] = useState(url)
    const [isCopied, setIsCopied] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const [count, setCount] = useState(0)
    const { updateParentState } = props

    useEffect(() => {
        ;(async () => {
            const response = await fetch(`/api/Vote/${props._id}/count`, {
                method: 'GET',
                mode: 'cors'
            })
            const data = await response.json()
            console.log('🚀 ~ file: PollCountPage.js ~ line 17 ~ data', data)
            setCount(data.count)
        })()
    }, [])

    useEffect(() => {
        const channel = pusher.subscribe('DinnerDeciderDemo')
        channel.bind('addVote', (vote) => {
            setCount(vote.count)
        })
    }, [setCount])

    useEffect(() => {
        count > 0 && setIsDisabled(false)
    }, [count, setIsDisabled])

    const onCopyText = () => {
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 1000)
    }
    const goToPollVote = (id) =>
        history.push({ pathname: `/Vote/${id}`, state: { id } })
    const goToPollResults = (id) =>
        history.push({ pathname: `/Results/${id}`, state: { id } })
    const getVotingResult = async () => {
        const response = await fetch(`/api/Poll/Results/${props._id}`, {
            mode: 'cors'
        })
        const data = await response.json()

        return data
    }
    const updateParent = async () => {
        const completedPoll = await getVotingResult()
        if (completedPoll) {
            updateParentState((prevState) => [...prevState, completedPoll])
            props.remove()
            goToPollResults(props._id)
        }
    }

    return (
        <Row className="w-75 mx-auto border p-3 mb-3">
            <span
                className="text-center align-middle col-4"
                style={{
                    border: '1px solid rgba(0,0,0,.125)',
                    borderRadius: '.25rem'
                }}
            >
                {props.name}
            </span>
            <ButtonGroup className="col">
                <CopyToClipboard text={text} onCopy={onCopyText}>
                    <Button variant="outline-primary" data-id={props._id}>
                        <i className="far fa-clipboard"></i>
                    </Button>
                </CopyToClipboard>
                <Button
                    variant="outline-primary"
                    onClick={(e) => goToPollVote(props._id)}
                >
                    <i className="fas fa-arrow-circle-right"></i>
                </Button>
                <Button variant="outline-danger" onClick={props.onClick}>
                    <i className="fas fa-trash"></i>
                </Button>
                <Button
                    variant="outline-primary"
                    disabled={isDisabled}
                    onClick={updateParent}
                >
                    <i className="fas fa-vote-yea"></i>
                    <span className="px-2">{count}</span>
                </Button>
            </ButtonGroup>
        </Row>
    )
}

export default PollBlock
