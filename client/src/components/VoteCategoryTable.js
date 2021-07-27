import React, { useState, useEffect } from 'react'
import { Row, ListGroup } from 'react-bootstrap'

const VoteCategoryTable = (props) => {
    const { id } = props
    console.log(
        '🚀 ~ file: VoteCategoryTable.js ~ line 6 ~ VoteCategoryTable ~ id',
        id
    )
    const [categoryNames, setCategoryNames] = useState([])
    const [categoryCounts, setCategoryCounts] = useState([])

    const getPollCategoryInfo = async () => {
        try {
            const response = await fetch(`/api/Results/count/${id}`, {
                method: 'GET',
                mode: 'cors'
            })
            console.log(
                '🚀 ~ file: VoteCategoryTable.js ~ line 15 ~ getPollCategoryInfo ~ response',
                response
            )

            if (response.ok) {
                const data = await response.json()
                const { categoryCounts } = data
                categoryCounts &&
                    setCategoryNames(Object.keys(categoryCounts)) &&
                    setCategoryCounts(Object.values(categoryCounts))
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPollCategoryInfo()
    }, [])
    return (
        <Row>
            <ListGroup>
                {categoryNames.map((category, i) => (
                    <ListGroup.Item key={`name-${id}-${i}`}>
                        {category}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <ListGroup>
                {categoryCounts.map((count, i) => (
                    <ListGroup.Item key={`count-${id}-{i}`}>
                        {count}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Row>
    )
}

export default VoteCategoryTable
