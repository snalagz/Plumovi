import Head from 'next/head'
import fetch from 'node-fetch'
import RecomMovie from '../../components/recomMovie'
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Link from 'next/link'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CurrencyFormat from 'react-currency-format';
import axios from 'axios';
import Navbar from '../../components/navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FaStar } from 'react-icons/fa'
import { FaBookmark } from 'react-icons/fa'
import firebase from '../../src/firebase'

function searchMovie(props) {
    console.log(props.data.results);
    return (
        <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Navbar />
            <Container>
                <Head>
                    <title>ara</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Oswald&family=Roboto&display=swap" rel="stylesheet" />
                </Head>

                <Row style={{justifyContent:'center', alignItems:'center'}}>
                    {props.data.results.map(item => (
                        item.poster_path && [
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
                                    <Card.Link href={item.href}>
                                        <Card.Img rounded variant="top" src={item.poster_path} style={{ objectFit: 'fill' }} />
                                    </Card.Link>
                                }
    
    
    
                                <Card.Body>
                                    <Card.Subtitle>
                                        <FaStar /> <Badge variant="danger" style={{ verticalAlign: 'baseline, ' }}>{item.vote_average}</Badge>
                                    </Card.Subtitle>
                                    {
                                        <Card.Link href={item.href}>
                                            <Card.Subtitle className="mb-2 text-muted" style={{ marginTop: '3px' }}>{item.title}</Card.Subtitle>
                                        </Card.Link>
                                    }
                                </Card.Body>
    
    
                            </Card>
                        ]
                    ))}
                </Row>

                <style global jsx>{`
                body{
                    margin:0px; 
                    padding:0px;
                    background-color: #000000;
                }
            `}
                </style>
            </Container>
        </Container>
    )
}

export async function getServerSideProps({ query }) {
    let movieName = query.name;
    console.log(movieName);
    movieName = movieName.toLowerCase();
    movieName = movieName.replace(/ı/g, 'i');
    movieName = movieName.replace(/ö/g, 'o');
    movieName = movieName.replace(/ü/g, 'u');
    movieName = movieName.replace(/ş/g, 's');
    movieName = movieName.replace(/ğ/g, 'g');
    movieName = movieName.replace(/ç/g, 'c');
    const resInfo = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=94ec2f0211fe06a3b2bc9827439383d8&language=tr-TR&query=${movieName}&page=1&include_adult=false
`)
    const data = await resInfo.json()
    return {
        props: { data }, // will be passed to the page component as props
    }
}

export default searchMovie;
