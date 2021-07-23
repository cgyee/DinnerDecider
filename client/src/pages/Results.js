import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Result from '../components/Result'
import { Container, Button, Row } from 'react-bootstrap'

const Results = (props) => {
    const URI_STRING = `api/Poll/Results/${props.history.location.state.id}`
    const history = useHistory()
    const [resturantInfo, setResturantInfo] = useState()

    const returnToDashboard = () => {
        history.push({ pathname: '/Dashboard' })
    }

    //Add H1/heders displaying selected Categories
    useEffect(() => {
        ;(async () => {
            const response = await fetch(`/${URI_STRING}`, {
                method: 'GET',
                mode: 'cors'
            })
            const resturantInfo = await response.json()
            setResturantInfo(resturantInfo)
        })()
    }, [setResturantInfo])
    return (
        <Container>
            <Row>
                {resturantInfo && <Result {...resturantInfo} />}
                <Button variant="success" onClick={returnToDashboard}>
                    Go Back <i className="far fa-arrow-alt-circle-left"></i>
                </Button>
            </Row>
        </Container>
    )
}

export default Results
