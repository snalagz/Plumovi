import Head from 'next/head'
import React, { useContext } from 'react';
import TrendsMovie from '../components/trendsMovie'
import TrendsTV from '../components/trendsTV'
import RecomMovie from '../components/recomMovie'
import Latest from '../components/latest'
import Navbar from '../components/navbar'
import Store from '../store/store'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import fetch from 'node-fetch'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Jumbotron from 'react-bootstrap/Jumbotron'

function Home({ dataTrendsMovie, dataTrendsTV, dataLatest }) {
  return (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Head>
        <meta name="google-site-verification" content="EB6N44R3eqxnPIqxzebt3_LK21zeObwvEvi1oWihjdY" />
        <title>Film ve Dizi Önerici</title>
      </Head>
      <Navbar />
      <Container>
        <Row>
          <Col>
            <RecomMovie />
          </Col>
          <Col sm={12}>
            <h3>Bugün En Popüler</h3>
          </Col>
          <Col sm={12}>
            <Tabs defaultActiveKey="movie" id="uncontrolled-tab-example">
              <Tab className="reactTabs" eventKey="movie" title="Filmler" >
                <TrendsMovie dataMovies={dataTrendsMovie} />
              </Tab>
              <Tab eventKey="tvSeries" title="Diziler">
                <TrendsTV dataMovies={dataTrendsTV} />
              </Tab>
            </Tabs>
          </Col>
        </Row>


        <Row>
          <Col sm={12}>
            <h3>En Yeni Filmler</h3>
          </Col>
          <Col sm={12}>
            <Latest data={dataLatest} />
          </Col>
        </Row>
      </Container>

      <style global jsx>{`
                body {
                  margin:0px; 
                  padding:0px;
                  background-color: #000000;
                }
                nav > a {
                  background-color: #1a1a1a;
                  color: #ffffff;
                  border-bottom: 0.1px white;
                }
                .nav-link.active {
                  color: #ffffff !important;
                  background-color: #1a1a1a !important;
                }
                .nav-link:hover {
                  color: #dc3545 !important;
                }
                h1{
                  color:#ffffff;
                }
                h2{
                  color:#ffffff;
                }
                h3{
                  color:#ffffff;
                }
            `}
      </style>
    </Container>
  )
}

export async function getServerSideProps({ query }) {
  const resTrendsMovie = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=94ec2f0211fe06a3b2bc9827439383d8`)
  const dataTrendsMovie = await resTrendsMovie.json()

  const resTrendsTV = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=94ec2f0211fe06a3b2bc9827439383d8`)
  const dataTrendsTV = await resTrendsTV.json()

  const resLatest = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=94ec2f0211fe06a3b2bc9827439383d8&language=en-EN&page=1
  `)
  const dataLatest = await resLatest.json();
  // Pass data to the page via props
  return {
    props: {
      dataTrendsMovie,
      dataTrendsTV,
      dataLatest
    }
  }
}

export default Home;
