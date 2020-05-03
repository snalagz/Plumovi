import Head from 'next/head'
import fetch from 'node-fetch'
import RecomMovie from '../../components/recomMovie'
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Link from 'next/link'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CurrencyFormat from 'react-currency-format';
import axios from 'axios';
import Navbar from '../../components/navbar'
import Container from 'react-bootstrap/Container'
import { FaHeart } from 'react-icons/fa'
import { FaBookmark } from 'react-icons/fa'
import firebase from '../../src/firebase'

function movieDetail(props) {
    const movie = props.dataInfo;
    const video = props.dataVideo.results;
    const year = (movie.release_date).split("-")[0];
    const similarMovies = props.dataSimilar.results;
    const recomMovies = props.dataRecom.results;
    const addLikeMovies = (movie, year) => {
        console.log(movie)
        console.log(year)
        const uid = localStorage.getItem("uid");
        const db = firebase.firestore();
        var userRef = db.collection("Users").doc(uid);
        userRef.get().then((querySnapshot) => {
            const userInfo = querySnapshot.data();
            const likedMoive = {
                id: movie.id,
                name: movie.title,
                photo: movie.poster_path,
                year: year,
            }
            let exist = false;
            userInfo.likeMovies.forEach( (item,key) => {
                if(item.id == likedMoive.id){
                    exist = true;
                }
            })
            if(!exist){
                userInfo.likeMovies.push(likedMoive)
                userRef.update({
                    "likeMovies": userInfo.likeMovies, 
                }).then(function() {
                    alert("Film Kayıt Edili")
                });
            } else {
                alert("Film Daha Önce Kayıt Edilmiş")
            }
        });
    }
    return (
        <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Navbar />
        <div className="mainContainer">
            <Head>
                <title>{movie.title} ({year}) Filmi - Plumovi.com</title>
                <meta property="og:title" content={movie.title + " (" + year + ") " + "Filmi - Plumovi.com"} key="title" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Oswald&family=Roboto&display=swap" rel="stylesheet" />
            </Head>
            
            <div className="left">

            </div>
            <div className="center">
                <div className="centerLeft">
                    <div class="title">
                        <h1>{movie.original_title}: {movie.title}</h1>
                    </div>
                    <div className="fragman">
                        {
                            video[0].key = `https://www.youtube.com/embed/${video[0].key}`,
                            <iframe height="315" src={video[0].key}
                                frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen></iframe>
                        }

                    </div>
                    <div className="topMovieCard">
                        <div className="contentCard">
                            <div className="contentCardLeft">
                                {
                                    movie.poster_path = "http://image.tmdb.org/t/p/w185" + movie.poster_path,
                                    <Image src={movie.poster_path} rounded width="100%" />
                                }
                            </div>
                            <div className="contentCardRight">
                                {movie.genres.map(genre => (
                                    <Link href="/movie">
                                        <Badge pill variant="danger" style={{ marginLeft: '2px' }}>{genre.name}</Badge>
                                    </Link>
                                ))}
                                <div>
                                    <span className="infoSpan">Vizyon Tarihi: </span><span>{movie.release_date}</span>
                                </div>
                                <div>
                                    <span className="infoSpan">Ortalama Puan: </span><span>{movie.vote_average}</span>
                                </div>
                                <div>
                                    <span className="infoSpan">Bütçe: </span>
                                    <CurrencyFormat value={movie.budget} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <span>{value}</span>} />
                                </div>
                                <div>
                                    <span className="infoSpan">Gelir: </span>
                                    <CurrencyFormat value={movie.revenue} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <span>{value}</span>} />
                                </div>
                                <div>
                                    <span className="infoSpan">Yıl:</span> <span>{year}</span>
                                </div>
                                <div style={{marginTop:'4px'}}>
                                    <Button variant="warning" size="sm" onClick={() => addLikeMovies(movie, year)}> <FaHeart /> Sevdim</Button>
                                    <Button variant="warning" size="sm" onClick={() => alert("Yapım Aşaması")} style={{marginLeft:'3px'}}> 
                                        <FaBookmark /> Listeye Ekle
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overView">
                        <h2>{movie.title} ({year}) Filmi Konusu</h2>
                        <p>{movie.overview}</p>
                    </div>
                    <h3>Bu Filmi Sevdiysen, Şu Filmler Öneriyoruz</h3>
                    {recomMovies.map(movie => (
                        <Card style={{
                            width: '150px',
                            height: 'auto', whiteSpace: 'pre-wrap',
                            display: 'inline-block', verticalAlign: 'top', border: 'none',
                            marginRight: '10px', overflow: 'hidden',
                            backgroundColor:'#1a1a1a'
                        }}>
                            {
                                movie.poster_path = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + movie.poster_path,
                                movie.href = `/filmler/${movie.title.split(' ').join('-')}-${movie.id}`,
                                <Card.Link href={movie.href}>
                                    <Card.Img rounded variant="top" src={movie.poster_path} style={{ objectFit: 'fill' }} />
                                </Card.Link>
                            }


                            <Card.Body>


                                <Card.Link href={movie.href}>
                                    <Card.Subtitle className="mb-2 text-muted" style={{ marginTop: '3px' }}>{movie.title}</Card.Subtitle>
                                </Card.Link>
                            </Card.Body>


                        </Card>
                    ))}
                </div>
                <div className="centerRight">
                    
                </div>
            </div>
            <div className="right">

            </div>


            <style global jsx>{`
                body{
                    margin:0px; 
                    padding:0px;
                    background-color: #000000;
                }
                h1{
                    font-size:30px;
                    font-family:'Oswald';
                    color:#ffffff;
                }
                h2{
                    font-size:24px;
                    color:#ffffff;
                }
                h3{
                    font-size:18px;
                    color:#ffffff;
                }
                .mainContainer{
                    margin: 0px;
                    padding: 0px;
                    display: flex;
                    flex-direction: row;
                    color:#646b6d;
                }
                .left{
                    flex:20;
                }
                .center{
                    display:flex;
                    flex:60;
                    flex-direction: row;
                }
                .centerLeft{
                    flex:99;
                    flex-direction: column;
                }
                .centerRight{
                    flex:1;
                    flex-direction: column;

                    padding: 15px 0px 0px 15px;
                }
                .fragman{
                    display:flex;
                    flex:1;
                }
                iframe{
                    width:100%;
                }
                .topMovieCard{
                    display:flex;
                    flex-direction:column;
                    margin-top:3px;
                }
                .contentCard{
                    display:flex;
                    flex-direction: row;
                }
                .contentCardLeft{
                    flex:35;
                }
                .contentCardRight{
                    flex:65;
                    padding:5px;
                    margin-left:10px;
                    margin-top:10px;
                }
                .overView{
                    margin-top:5px;
                }
                .right{
                    flex:20;
                }
                h1, h2{
                    font-family:'Roboto';
                }
                .infoSpan{
                    font-weight: bold;
                    font-family: 'Roboto'
                }
                @media only screen and (max-width: 600px) {
                    .left {
                      display:none;
                    }
                    .center{
                        display:flex;
                        flex:60;
                        flex-direction: column;
                    }
                    .right{
                      display:none;
                    }
                    .contentCardLeft{
                        flex:30;
                    }
                    .contentCardRight{
                        flex:60;
                    }
                }
            `}
            </style>
            <style global jsx>{`
                body {
                 
                }
            `}
            </style>
        </div>
        </Container>
    )
}

export async function getServerSideProps({ query }) {
    const movieId = query.id.split("-").pop();

    const resInfo = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=94ec2f0211fe06a3b2bc9827439383d8&language=tr-TR`)
    const dataInfo = await resInfo.json()
    const resVideo = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=94ec2f0211fe06a3b2bc9827439383d8&language=en-EN
    `)
    const dataVideo = await resVideo.json();


    let dataSimilar;
    await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=94ec2f0211fe06a3b2bc9827439383d8&language=tr-TR&page=1`)
        .then(res => {
            dataSimilar = res.data;
        })
    let dataRecom;
    await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=94ec2f0211fe06a3b2bc9827439383d8&language=tr-TR&page=1`)
        .then(res => {
            dataRecom = res.data;
        })
    
    
    return {
        props: { dataInfo, dataVideo, dataSimilar, dataRecom }, // will be passed to the page component as props
    }
}

export default movieDetail;
