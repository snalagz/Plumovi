import React, { useState, useEffect, useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Dropdown from 'react-bootstrap/Dropdown'
import { FaGoogle } from 'react-icons/fa';
import Head from 'next/head'
import firebase from '../src/firebase'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
import Store from '../store/store'
import axios from 'axios'
import { FaStar } from 'react-icons/fa'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'

function RecomMovie() {
    const [uid, setUid] = useState("");
    const [recom, setRecom] = useState([]);

    useEffect(() => {
        const uid = localStorage.getItem("filmbulUid")
        setUid(uid);
        if (uid) {
            const db = firebase.firestore();
            var userRef = db.collection("Users").doc(uid);
            userRef.get().then((querySnapshot) => {
                const userInfo = querySnapshot.data();
                const likeMovies = userInfo.likeMovies;
                const last5Movies = likeMovies.slice(Math.max(likeMovies.length - 5, 0));
                let promiseList = [];

                last5Movies.forEach(movie => {
                    const movieId = movie.id;
                    promiseList.push(axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=94ec2f0211fe06a3b2bc9827439383d8&language=tr-TR&page=1`));
                })
                console.log(promiseList);
                const recom = [];
                Promise.all(promiseList).then((values) => {
                    values.forEach(item => {
                        const movies = item.data.results;
                        if (movies.length > 5) movies.splice(5, movies.length);
                        movies.forEach(movie => {
                            recom.push(movie)
                        })
                    })
                    setRecom(recom);
                });
            });
        }
    }, []);


    return (
        <div>
            { uid && <h3>Senin İçin Film Önerilerimiz</h3> } 
            <div className="tabs">
                {recom.map(item => (
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
                            <Card.Subtitle>
                                <FaStar /> <Badge variant="danger" style={{ verticalAlign: 'baseline, ' }}>{item.vote_average}</Badge>
                            </Card.Subtitle>
                            {

                                <Card.Link href={item.href.toLowerCase()}>
                                    <Card.Subtitle className="mb-2 text-muted" style={{ marginTop: '3px' }}>{item.title}</Card.Subtitle>
                                </Card.Link>
                            }
                        </Card.Body>


                    </Card>
                ))}
            </div>
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

export default RecomMovie;