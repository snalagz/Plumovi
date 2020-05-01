import Head from 'next/head'
import fetch from 'node-fetch'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function movieDetail(props) {
    console.log(props)
    // Combine the data with the id
    const movie = props.dataMovie;
    const year = (movie.release_date).split("-")[0];
    return (
        <Container fluid>
            <Head>
                <title>{movie.title} ({year}) Filmi - Plumovi.com</title>
                <meta property="og:title" content={movie.title + " (" + year + ") " + "Filmi - Plumovi.com"} key="title" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Oswald&family=Roboto&display=swap" rel="stylesheet" />
            </Head>
            <Container fluid>
                <Container>
                    <Row>
                        <Col>
                            <h1>{movie.title}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <Image src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/m0zlqWkZenD8kWCkomKQZADChd0.jpg" rounded width="100%" />
                        </Col>
                        <Col xs={9}>
                            <Row>
                                <Col>

                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div style={{ width: '32px', height: '32px', }}>
                                        <CircularProgressbar
                                            value={movie.vote_average}
                                            maxValue={10}
                                            text={`${movie.vote_average}`}
                                            background={true}
                                            strokeWidth={4}
                                            backgroundPadding={10}
                                            styles={buildStyles({
                                                // Rotation of path and trail, in number of turns (0-1)


                                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                strokeLinecap: 'round',

                                                // Text size
                                                textSize: '33px',

                                                // How long animation takes to go from one percentage to another, in seconds
                                                pathTransitionDuration: 0.5,

                                                // Can specify path transition in more detail, or remove it entirely
                                                // pathTransition: 'none',

                                                // Colors
                                                pathColor: '#ffffff',
                                                textColor: '#ffffff',
                                                trailColor: '#3e98c7',
                                                backgroundColor: '#3e98c7',
                                                display: 'inline'
                                            })}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <span className="InfoSpan">Vizyon Tarihi: </span><span> {movie.release_date}</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <span className="InfoSpan">Kategori: </span>
                                    {movie.genres.map(genre => (
                                        <Link href="/about">
                                            <a>{genre.name} </a>
                                        </Link>
                                    ))}

                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <span className="InfoSpan">Yılı: </span>
                                    <Link href="/about">
                                        <a>{year} </a>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <h2>{movie.title} Konusu</h2>
                        </Col>
                        <Col sm={12}>
                            <p style={{ fontFamily: 'Roboto' }}>{movie.overview}</p>
                        </Col>
                    </Row>
                </Container>
            </Container>


            <style jsx>{`
                h1, h2{
                    font-family:'Roboto';
                }
                .InfoSpan{
                    font-weight: bold;
                    font-family: 'Roboto'
                }
            `}
            </style>
            <style global jsx>{`
                body {
                 
                }
            `}
            </style>
        </Container>
    )
}

export async function getServerSideProps({ query }) {
    const movieId = query.id.split("-").pop();
    const resMovie = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=94ec2f0211fe06a3b2bc9827439383d8&language=tr-TR`)
    const dataMovie = await resMovie.json()
    return {
        props: { dataMovie }, // will be passed to the page component as props
    }
}

export default movieDetail;
