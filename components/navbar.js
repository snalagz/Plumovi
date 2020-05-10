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
import Link from 'next/link'

function mNavbar() {

    const closeAuth = () => {
        localStorage.removeItem("filmbulUid");
        location.reload();
    }
    const auth = () => {
        console.log(localStorage);
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().languageCode = 'tr';
        firebase.auth().signInWithPopup(provider).then(function (result) {
            const token = result.credential.accessToken;
            const user = result.user;
            const uid = user.uid;
            const db = firebase.firestore();
            var docRef = db.collection("Users").doc(uid);

            docRef.get().then(function (doc) {
                if (doc.exists) {
                    localStorage.setItem("filmbulUid", uid);
                    location.reload();
                } else {
                    db.collection("Users").doc(uid).set({
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        likeMovies: [],
                        watchList: [],
                    })
                        .then(function () {
                            console.log("Document successfully written!");
                            localStorage.setItem("filmbulUid", uid);
                            location.reload();
                        })
                        .catch(function (error) {
                            alert("Giriş Başarısız")
                        });
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });

        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(error)
        });
    }


    const [uid, setUid] = useState("");
    const [movieSearch, setMovieSearhc] = useState("");

    useEffect(() => {
        const uid = localStorage.getItem("filmbulUid")
        setUid(uid);
    });

    const search = () => {
        location.replace(`/filmara/${movieSearch}`);
    }
    /*
        // context değiştiğinde çalışır
        const MyComponent = (props) => {
        const ctx = useContext(MyContext)
        
        useEffect(() => {
            // Do stuff
        }, [...Object.values(ctx)])
        }
    */
    return (
        <Navbar variant="dark" expand="lg" style={{ backgroundColor: '#121212' }}>
            <Navbar.Brand href="/">Plumovi</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Anasayfa</Nav.Link>
                    {
                        uid ? [
                            <NavDropdown title="Profil" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/begendigim-filmler">Beğendiğim Filmler</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => closeAuth()}>Çıkış Yap</NavDropdown.Item>
                            </NavDropdown>
                        ] : [
                            <Button variant="danger" style={{ marginLeft: '3px' }} onClick={() => auth()}>
                                <FaGoogle /> Giriş Yap
                            </Button>
                            ]
                    }




                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Örn: Yüzüklerin Efendisi" className="mr-sm-2"
                        value={movieSearch} onChange={(event) => setMovieSearhc(event.target.value)} />
                    <Button variant="danger" onClick={() => search()} style={{marginTop:'2px;'}}>Ara</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default mNavbar;