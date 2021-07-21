import React, { useEffect, useState } from 'react'
import { Row, Button, ButtonGroup } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const PollBlock = (props) => {
    //TODO update me to use variable for paths!
    const url = `http://localhost:3000/Vote/${props._id}`
    const history = useHistory()
    const [text, setText] = useState(url)
    const [isCopied, setIsCopied] = useState(false)

    useEffect(() => {}, [])

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
                    <button
                        className="btn btn-outline-primary"
                        data-id={props._id}
                    >
                        <i className="far fa-clipboard"></i>
                    </button>
                </CopyToClipboard>
                <button
                    onClick={(e) => goToPollVote(props._id)}
                    className="btn btn-outline-primary"
                >
                    Vote
                </button>
                {/* <button
                    disabled={!props.isComplete}
                    onClick={(e) => goToPollResults(props._id)}
                    className="btn btn-outline-danger"
                >
                    End
                </button> */}
                <button
                    className="btn btn-outline-danger"
                    onClick={props.onClick}
                >
                    <i className="fas fa-trash"></i>
                </button>
                <Button variant="outline-primary">END</Button>
            </ButtonGroup>
        </Row>
    )
}

export default PollBlock
