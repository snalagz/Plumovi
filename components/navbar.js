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
            <Navbar.Brand href="/">Filmbul</Navbar.Brand>
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
                    <NavDropdown title="Kategoriler" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/filmler/kategori/aksiyon-filmleri/1">Aksiyon</NavDropdown.Item>
                        <NavDropdown.Item href="/filmler/kategori/macera-filmleri/1">Macera</NavDropdown.Item>
                        <NavDropdown.Item href="/filmler/kategori/animasyon-filmleri/1">Animasyon</NavDropdown.Item>
                        <NavDropdown.Item href="/filmler/kategori/komedi-filmleri/1">Komedi</NavDropdown.Item>
                        <NavDropdown.Item href="/filmler/kategori/suc-filmleri/1">Suç</NavDropdown.Item>
                        <NavDropdown.Item href="/filmler/kategori/belgesel-filmleri/1">Belgesel</NavDropdown.Item>
                        <NavDropdown.Item href="/filmler/kategori/dram-filmleri/1">Dram</NavDropdown.Item>
                        <NavDropdown.Item href="/filmler/kategori/aile-filmleri/1">Aile</NavDropdown.Item>
                        <NavDropdown.Item href="/filmler/kategori/fantastik-filmleri/1">Fantastik</NavDropdown.Item>
                        <NavDropdown.Item href="/filmler/kategori/tarih-filmleri/1">Tarih</NavDropdown.Item>
                        <NavDropdown.Item href="/filmler/kategori/korku-filmleri/1">Korku</NavDropdown.Item>
                        <NavDropdown.Item href="/filmler/kategori/müzik-filmleri/1">Müzik</NavDropdown.Item>
                        <NavDropdown.Item href="/filmler/kategori/gizem-filmleri/1">Gizem</NavDropdown.Item>
                        <NavDropdown.Item href="/filmler/kategori/romantik-filmler/1">Romantik</NavDropdown.Item>
                        <NavDropdown.Item href="/filmler/kategori/bilim-kurgu-filmleri/1">Bilim Kurgu</NavDropdown.Item>
                        <NavDropdown.Item href="/filmler/kategori/gerilim-filmleri/1">Gerilim</NavDropdown.Item>
                        <NavDropdown.Item href="/filmler/kategori/tarih-filmleri/1">Tarih</NavDropdown.Item>
                        <NavDropdown.Item href="/filmler/kategori/vahsi-bati-filmleri/1">Vahşi Batı</NavDropdown.Item>
                    </NavDropdown>



                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Örn: Yüzüklerin Efendisi" className="mr-sm-2"
                        value={movieSearch} onChange={(event) => setMovieSearhc(event.target.value)} />
                    <Button variant="danger" onClick={() => search()} style={{ marginTop: '2px;' }}>Ara</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default mNavbar;