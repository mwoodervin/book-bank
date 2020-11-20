import React from 'react'
import { Card } from 'react-bootstrap';
import './card.css';

export default function BookCard({thumbnail,title}) {
    return (
        <div>
            <Card class="cardStyle">
                <Card.Img variant="top" src={thumbnail} />
                <Card.Body>
                <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">{}</small>
                </Card.Footer>
            </Card>
        </div>
    )
}



