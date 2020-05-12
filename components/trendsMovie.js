import React, { useContext } from 'react';
import fetch from 'node-fetch'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { FaStar } from 'react-icons/fa'
import Badge from 'react-bootstrap/Badge'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Trends(props) {
    return (
        <div className="tabs">
            {props.dataMovies.results.map(item => (
                <Card style={{
                    width: '150px',
                    height: 'auto', whiteSpace: 'pre-wrap',
                    display: 'inline-block', verticalAlign: 'top', border: 'none',
                    marginRight: '10px', overflow: 'hidden',
                    backgroundColor: '#1a1a1a'
                }}>
                    {
                        item.poster_path = "http://image.tmdb.org/t/p/w185" + item.poster_path,
                        item.href = `/filmler/${item.title.split(' ').join('-')}-${item.id}`,
                        <Card.Link href={item.href.toLowerCase()}>
                            <Card.Img rounded variant="top" src={item.poster_path} style={{ objectFit: 'fill' }} />
                        </Card.Link>
                    }



                    <Card.Body>
                        <Card.Subtitle style={{ marginBottom: '2px' }}>
                            <Badge variant="danger" style={{ verticalAlign: 'baseline' }}>  {item.vote_average} Ort</Badge>  <Badge variant="primary" style={{ verticalAlign: 'baseline' }}> {item.vote_count} Oy</Badge>
                        </Card.Subtitle>
                        {
                            <Card.Link href={item.href.toLowerCase()}>
                                <Card.Subtitle className="mb-2 text-muted" style={{ marginTop: '3px' }}>{item.title} </Card.Subtitle>
                            </Card.Link>
                        }
                    </Card.Body>


                </Card>
            ))}


            <style jsx>{`
                .tabs{
                    overflow: auto;
                    white-space: nowrap;
                    padding-bottom: 15px;
                    scrollbar-width: thin;
                }
            `}
            </style>
            <style global jsx>{`
                body {
                 margin: 0px; padding: 0px
                }
            `}
            </style>
        </div>
    )
}




export default Trends