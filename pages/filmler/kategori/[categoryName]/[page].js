import { useRouter } from 'next/router'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from 'react-bootstrap/Pagination'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Navbar from '../../../../components/navbar'
import Footer from '../../../../components/footer'
import Head from 'next/head'
import { FaStar } from 'react-icons/fa'
const Category = (props) => {
  const router = useRouter()
  const categoryName = router.query.categoryName
  let page = router.query.page

  const movieData = props.data;
  const total_pages = movieData.total_pages;

  page = parseInt(page);
  let active = page;
  let items = [];
  for (let number = page - 4; number <= page + 4; number++) {
    if (number > 0) {
      items.push(
        <Pagination.Item key={number} active={number === active}>
          <Link href={`/filmler/kategori/${categoryName}/${number}`}>
            <a>{number}</a>
          </Link>
        </Pagination.Item>,
      );
    }
  }

  let title = "";
  categoryName.split("-").join(" ").split(" ").forEach(item => {
    const tmp = item.charAt(0).toUpperCase() + item.slice(1);
    title += tmp + " ";
  })
  title = title + "- Filmbul.org"

  return (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Head>
        <meta name="google-site-verification" content="wQGqWQ4Kp2Hf8aDMKA8sz6onsTDa7oHoaRc6vkdU_io" />
        <title>{title}</title>
        <meta name="description" content="Filmbul.org - En güncel film önerileri, fragmanlar, film bilgileri. Beğendiğin filmleri seç izlemen sana özel film önerilerini al !" />
      </Head>

      <Navbar />

      <Container>
        <Row>
          <h1>{categoryName.split("-").join(" ")}</h1>
        </Row>
        <Row style={{ display: 'flex', justifyContent: 'center' }}>
          {movieData.results.map(item => (
            <Card style={{
              width: '150px',
              height: 'auto', whiteSpace: 'pre-wrap',
              display: 'inline-block', verticalAlign: 'top', border: 'none',
              marginRight: '10px', overflow: 'hidden',
              backgroundColor: '#1a1a1a',
              marginTop: '10px'
            }}>
              {
                <Card.Link href={`/filmler/${item.original_title.split(' ').join('-').toLowerCase()}-${item.id}`}>
                  <Card.Img rounded variant="top" src={`http://image.tmdb.org/t/p/w185${item.poster_path}`} style={{ objectFit: 'fill' }} />
                </Card.Link>
              }


              <Card.Body>
                <Card.Subtitle style={{marginBottom: '2px'}}>
                  <Badge variant="danger" style={{ verticalAlign: 'baseline' }}>  {item.vote_average} Ort</Badge>  <Badge variant="primary" style={{ verticalAlign: 'baseline' }}> {item.vote_count} Oy</Badge>
                </Card.Subtitle>
                {
                  <Card.Link href={`/filmler/${item.original_title.split(' ').join('-').toLowerCase()}-${item.id}`}>
                    <Card.Subtitle className="mb-2 text-muted" style={{ marginTop: '3px' }}>{item.title} </Card.Subtitle>
                  </Card.Link>
                }
              </Card.Body>


            </Card>
          ))}
        </Row>
        <Row style={{ marginTop: '15px', marginBottom: '10px' }}>
          <Pagination style={{ margin: 'auto' }} className="pagination">
            <Pagination.Item>
              <Link href={`/filmler/kategori/${categoryName}/1`}>
                <a>1</a>
              </Link>
            </Pagination.Item>
            <Pagination.Ellipsis />
            {items}
            <Pagination.Ellipsis />
            <Pagination.Item>
              <Link href={`/filmler/kategori/${categoryName}/${total_pages}`}>
                <a>{total_pages}</a>
              </Link>
            </Pagination.Item>
          </Pagination>
        </Row>

        <Footer />
      </Container>

      <style global jsx>{`
                body {
                  margin:0px; 
                  padding:0px;
                  background-color: #000000;
                }
                .pagination{

                }
                a{
                  color:#ffffff;
                }
                a:hover{
                  color:#dc3545;
                }
                .page-link, .page-item{
                  background-color: #1a1a1a;
                }
                .pagination > li > a
                {
                    background-color: white;
                    border:none;
                    color:#ffffff;
                    background-color: #1a1a1a
                }
                h1{
                  color:#ffffff;
                  padding-left:10px;
                  padding-right:10px;
                }
            `}
      </style>
    </Container>
  )
}

export async function getServerSideProps({ query }) {
  const page = query.page;
  const categoryName = query.categoryName.split("-")[0];
  let categoryId;
  if (categoryName == "aksiyon") {
    categoryId = "28";
  } else if (categoryName == "macera") {
    categoryId = "12";
  } else if (categoryName == "animasyon") {
    categoryId = "16";
  } else if (categoryName == "komedi") {
    categoryId = "35";
  } else if (categoryName == "suc") {
    categoryId = "80";
  } else if (categoryName == "belgesel") {
    categoryId = "99";
  } else if (categoryName == "dram") {
    categoryId = "18";
  } else if (categoryName == "aile") {
    categoryId = "10751";
  } else if (categoryName == "fantastik") {
    categoryId = "14";
  } else if (categoryName == "tarih") {
    categoryId = "36";
  } else if (categoryName == "korku") {
    categoryId = "27";
  } else if (categoryName == "müzik") {
    categoryId = "10402";
  } else if (categoryName == "gizem") {
    categoryId = "9648";
  } else if (categoryName == "romantik") {
    categoryId = "10749";
  } else if (categoryName == "bilim") {
    categoryId = "878";
  } else if (categoryName == "gerilim") {
    categoryId = "53";
  } else if (categoryName == "savas") {
    categoryId = "10752";
  } else if (categoryName == "vahsi") {
    categoryId = "37";
  }

  const dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1;
  let day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  if (month < 10) month = `0${month}`;

  const today = `${year}-${month}-${day}`;

  const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=94ec2f0211fe06a3b2bc9827439383d8&
  language=tr-TR&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page=${page}
  &release_date.lte=${today}&with_genres=${categoryId}&vote_count.gte=40`)
  const data = await res.json()

  return {
    props: { data }, // will be passed to the page component as props
  }
}

export default Category