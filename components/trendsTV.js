import React, { useContext } from 'react';
import fetch from 'node-fetch'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { FaStar } from 'react-icons/fa'
import Badge from 'react-bootstrap/Badge'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function TrendsTV(props) {
    return (
        <div className="tabs">
            {props.dataMovies.results.map(item => (
                <Card style={{
                    width: '150px',
                    height: 'auto', whiteSpace: 'pre-wrap',
                    display: 'inline-block', verticalAlign: 'top', border: 'none',
                    marginRight: '10px', overflow: 'hidden',
                    backgroundColor:'#1a1a1a'
                }}>
                    {
                        item.poster_path = "http://image.tmdb.org/t/p/w185" + item.poster_path,
                        item.href = `/diziler/${item.name.split(' ').join('-')}-${item.id}`,
                        <Card.Link href={item.href}>
                            <Card.Img rounded variant="top" src={item.poster_path} style={{ objectFit: 'fill' }} />
                        </Card.Link>
                    }


                    <Card.Body>
                        <Card.Subtitle>
                           <FaStar /> <Badge variant="primary" style={{verticalAlign:'baseline, '}}>{item.vote_average}</Badge>
                        </Card.Subtitle>
                        <Card.Link href="#">
                            <Card.Subtitle className="mb-2 text-muted" style={{marginTop:'3px'}}>{item.name}</Card.Subtitle>
                        </Card.Link>
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




export default TrendsTV