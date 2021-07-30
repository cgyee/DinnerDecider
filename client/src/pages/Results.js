import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Result from '../components/Result'
import VoteCategoryTable from '../components/VoteCategoryTable'
import { Container, Button, Row } from 'react-bootstrap'
import { useAuth } from '../auth'

const Results = (props) => {
    const history = useHistory()
    const { id } = history.location.state
    const URI_STRING = `api/Poll${history.location.pathname}`
    const [resturantInfo, setResturantInfo] = useState()
    const { isAuthenticated } = useAuth()

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
                {isAuthenticated() && (
                    <>
                        <VoteCategoryTable id={id} />
                        <Button variant="success" onClick={returnToDashboard}>
                            Go Back{' '}
                            <i className="far fa-arrow-alt-circle-left"></i>
                        </Button>
                    </>
                )}
            </Row>
        </Container>
    )
}

export default Results
