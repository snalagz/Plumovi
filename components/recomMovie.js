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

function RecomMovie() {
    const [uid, setUid] = useState("");
    useEffect(() => {
        const uid = localStorage.getItem("uid")
        setUid(uid);
    }, []);

    return (
        <div>
            <h3>Senin İçin Film Önerilerimiz</h3>
            {uid} fsdfsdf
        </div>
    )
}

export default RecomMovie;