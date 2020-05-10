import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Navbar from '../components/navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import firebase from '../src/firebase'
import { FaStar } from 'react-icons/fa'
import Badge from 'react-bootstrap/Badge'
function likeMovies(props) {
    const [uid, setUid] = useState("");
    const [likedMovie, setLikedMovie] = useState([]);
    useEffect(() => {
        const uid = localStorage.getItem("filmbulUid")
        setUid(uid);

        const db = firebase.firestore();
        var userRef = db.collection("Users").doc(uid);
        userRef.get().then((querySnapshot) => {
            const userInfo = querySnapshot.data();
            setLikedMovie(userInfo.likeMovies);
            console.log(userInfo.likeMovies);
        });
    }, []);

    return (
        <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Navbar />
            <Container>
                <Head>
                    <title>Beğendiğim Filmler</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Oswald&family=Roboto&display=swap" rel="stylesheet" />
                </Head>

                <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {likedMovie.map(item => (
                        console.log(item),
                        item.photo && [
                            <Card style={{
                                width: '150px',
                                height: 'auto', whiteSpace: 'pre-wrap',
                                display: 'inline-block', verticalAlign: 'top', border: 'none',
                                marginRight: '10px', overflow: 'hidden',
                                backgroundColor: '#1a1a1a'
                            }}>
                                {
                                    <Card.Link href={item.link}>
                                        <Card.Img rounded variant="top" src={item.photo} style={{ objectFit: 'fill' }} />
                                    </Card.Link>
                                }



                                <Card.Body>
                                    <Card.Subtitle>
                                        <FaStar /> <Badge variant="danger" style={{ verticalAlign: 'baseline, ' }}>{item.year}</Badge>
                                    </Card.Subtitle>
                                    {
                                        <Card.Link href={item.link}>
                                            <Card.Subtitle className="mb-2 text-muted" style={{ marginTop: '3px' }}>{item.name}</Card.Subtitle>
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

    // const resInfo = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=94ec2f0211fe06a3b2bc9827439383d8&language=en-EN&query=${movieName}&page=1&include_adult=false`)
    // const data = await resInfo.json()
    return {
        props: {}, // will be passed to the page component as props
    }
}

export default likeMovies;
