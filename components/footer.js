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

function Footer() {
    return (
        <div className="mainContainer">
            <p>
                Plumovi siz değerli kullanıcılarına film ve dizi önerileri sunmak amacıyla oluşturulmuş bir platformdur.
            </p>

            <style global jsx>{`
                .mainContainer{
                    margin:0px; 
                    padding:0px;
                    background-color: #000000;
                    color: white;
                    margin-top: 20px;
                }
            `}
            </style>
        </div>
    )
}

export default Footer;