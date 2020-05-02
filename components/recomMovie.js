import React, { useContext } from 'react';
import fetch from 'node-fetch'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { FaStar } from 'react-icons/fa'
import Badge from 'react-bootstrap/Badge'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function RecomMovie(props) {
    return (
        
            <div>
            {props.dataMovies.map(item => (
                <div style={{ display: 'inline-block' }}>
                            <Card style={{ width: '18rem', whiteSpace: 'pre-wrap' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        </div>
            ))}
            </div>
    )
}




export default RecomMovie