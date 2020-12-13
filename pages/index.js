import Head from "next/head";
import React, { useContext, useState } from "react";
import TrendsMovie from "../components/trendsMovie";
import RecomMovie from "../components/recomMovie";
import Latest from "../components/latest";
import HighAverage from "../components/highAverage";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import fetch from "node-fetch";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Home({
  dataTrendsMovie,
  dataTrendsTV,
  dataLatest,
  dataHighAverage,
  dataBest2020,
  dataPopuler2020,
}) {
  return (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Head>
        <meta
          name="google-site-verification"
          content="wQGqWQ4Kp2Hf8aDMKA8sz6onsTDa7oHoaRc6vkdU_io"
        />
        <title>
          Filmbul - Film ve Dizi Önerileri, Listeler, Yorumlar, Fragmanlar
        </title>
        <meta
          name="description"
          content="Filmbul.org - En güncel film ve dizi önerileri, fragmanlar, 
        film bilgileri, listeler. Beğendiğin filmleri seç sana özel film önerilerini al !"
        />
        {/* Global site tag (gtag.js) - Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-91214712-6"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `<!-- Global site tag (gtag.js) - Google Analytics -->
              <script async src="https://www.googletagmanager.com/gtag/js?id=UA-163332503-1"></script>
              <script>
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'UA-91214712-6');
              </script>
              `,
          }}
        />
        />
      </Head>
      <Navbar />

      <Container>
        <Row>
          <Col>
            <RecomMovie />
          </Col>
        </Row>

        <Row style={{ marginTop: "20px" }}>
          <Col sm={12}>
            <h2>Yakın Tarihli Yüksek Puanlı Film Önerileri</h2>
          </Col>
          <Col sm={12}>
            <HighAverage data={dataHighAverage} />
          </Col>
        </Row>

        <Row style={{ marginTop: "20px" }}>
          <Col sm={12}>
            <h2>Bugün En Popüler Filmler</h2>
          </Col>
          <Col sm={12}>
            <TrendsMovie dataMovies={dataTrendsMovie} />
          </Col>
        </Row>

        <Row style={{ marginTop: "20px" }}>
          <Col sm={12}>
            <h2>En Yeni Filmler</h2>
          </Col>
          <Col sm={12}>
            <Latest data={dataLatest} />
          </Col>
        </Row>

        <Row style={{ marginTop: "20px" }}>
          <Col sm={12}>
            <h2>2020 En İyi Film Önerileri</h2>
          </Col>
          <Col sm={12}>
            <Latest data={dataBest2020} />
          </Col>
        </Row>

        <Row style={{ marginTop: "20px" }}>
          <Col sm={12}>
            <h2>2020 En Popüler Filmler</h2>
          </Col>
          <Col sm={12}>
            <Latest data={dataPopuler2020} />
          </Col>
        </Row>

        <Footer />
      </Container>

      <style global jsx>
        {`
          body {
            margin: 0px;
            padding: 0px;
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
          h1 {
            color: #ffffff;
          }
          h2 {
            color: #ffffff;
          }
          h3 {
            color: #ffffff;
          }
        `}
      </style>
    </Container>
  );
}

export async function getServerSideProps({ query }) {
  const resTrendsMovie = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=94ec2f0211fe06a3b2bc9827439383d8`
  );
  const dataTrendsMovie = await resTrendsMovie.json();

  const resTrendsTV = await fetch(
    `https://api.themoviedb.org/3/trending/tv/day?api_key=94ec2f0211fe06a3b2bc9827439383d8`
  );
  const dataTrendsTV = await resTrendsTV.json();

  const resLatest = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=94ec2f0211fe06a3b2bc9827439383d8&language=en-EN&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page=1&vote_count.gte=100&vote_average.gte=4`
  );
  const dataLatest = await resLatest.json();

  const resHighAverage = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=94ec2f0211fe06a3b2bc9827439383d8&language=en-EN&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&vote_count.gte=100&vote_average.gte=6`
  );
  const dataHighAverage = await resHighAverage.json();

  const resBest2020 = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=94ec2f0211fe06a3b2bc9827439383d8&language=en-EN&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&primary_release_year=2020&vote_count.gte=600`
  );
  const dataBest2020 = await resBest2020.json();

  const populer2020 = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=94ec2f0211fe06a3b2bc9827439383d8&language=en-EN&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2020&vote_count.gte=600`
  );
  const dataPopuler2020 = await populer2020.json();

  // Pass data to the page via props
  return {
    props: {
      dataTrendsMovie,
      dataTrendsTV,
      dataLatest,
      dataHighAverage,
      dataBest2020,
      dataPopuler2020,
    },
  };
}

export default Home;
