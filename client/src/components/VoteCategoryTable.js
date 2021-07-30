import React, { useState, useEffect } from 'react'
import { Row, Col, ListGroup } from 'react-bootstrap'

const VoteCategoryTable = (props) => {
    const { id } = props
    const [categoryNames, setCategoryNames] = useState([])
    const [categoryCounts, setCategoryCounts] = useState([])

    const getPollCategoryInfo = async () => {
        const url = `/api/Poll/Results/count/${id}`
        try {
            const response = await fetch(url, {
                method: 'GET',
                mode: 'cors'
            })
            if (response.ok) {
                const data = await response.json()
                const { categoryCounts } = data
                if (categoryCounts) {
                    setCategoryNames(Object.keys(categoryCounts))
                    setCategoryCounts(Object.values(categoryCounts))
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        id && getPollCategoryInfo()
    }, [])
    return (
        <Row>
            <Col className="mb-3">
                <ListGroup>
                    {categoryNames.map((category, i) => (
                        <ListGroup.Item key={`name-${id}-${i}`}>
                            {category}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
            <Col>
                <ListGroup>
                    {categoryCounts.map((count, i) => (
                        <ListGroup.Item key={`count-${id}-{i}`}>
                            {count}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        </Row>
    )
}

export default VoteCategoryTable
