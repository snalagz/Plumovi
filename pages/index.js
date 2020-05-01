import Head from 'next/head'
import React, { useContext } from 'react';
import Store from '../store/store'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import TrendsMovie from '../components/trendsMovie'
import TrendsTV from '../components/trendsTV'
import Latest from '../components/latest'
import fetch from 'node-fetch'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

function Home({ dataTrendsMovie, dataTrendsTV, dataLatest }) {
  const { state, dispatch } = useContext(Store);
  return (
    <div className="container">
      <Head>
        <title>Plumovi - Film ve Dizileri Keşfet !</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Row>
          <Col sm={12}>
            <h3>En Popüler</h3>
          </Col>
          <Col sm={12}>
            <Tabs defaultActiveKey="movie" id="uncontrolled-tab-example">
              <Tab eventKey="movie" title="Filmler">
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
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const resTrendsMovie = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=94ec2f0211fe06a3b2bc9827439383d8`)
  const dataTrendsMovie = await resTrendsMovie.json()

  const resTrendsTV = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=94ec2f0211fe06a3b2bc9827439383d8`)
  const dataTrendsTV = await resTrendsTV.json()

  const resLatest = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=94ec2f0211fe06a3b2bc9827439383d8&language=tr-TR&page=1
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
