import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-circular-progressbar/dist/styles.css";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { useRouter } from "next/router";

import { Container, Card, Button, Col, Row, Badge } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import Link from "next/link";

function movieDetail({ data, title, description }) {
  const router = useRouter();

  let page = router.query.page;
  const recomName = router.query.recomName;
  page = parseInt(page);
  let active = page;
  let items = [];
  for (let number = page - 4; number <= page + 4; number++) {
    if (number > 0) {
      items.push(
        <Pagination.Item key={number} active={number === active}>
          <Link href={`/film-onerileri/${recomName}/${number}`}>
            <a>{number}</a>
          </Link>
        </Pagination.Item>
      );
    }
  }

  const movieData = data.results;
  return (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Navbar />
      <Head>
        <meta
          name="google-site-verification"
          content="wQGqWQ4Kp2Hf8aDMKA8sz6onsTDa7oHoaRc6vkdU_io"
        />
        <title>{title}</title>
        <meta
          name="description"
          content="Filmbul.org - 2020 yılında çıkmış kesinlikle izlemene gereken film önerilerini senin için derledik. Daha fazla film önerisi için bizleri takip et !"
        />
      </Head>
      <Row style={{ padding: 10 }}>
        <h1>{title}</h1>
      </Row>
      <Row style={{ padding: 10, marginLeft: 10 }}>
        <p style={{ color: "#ffffff" }}>{description}</p>
      </Row>
      <Row>
        {movieData.map(
          (item) =>
            item.overview.length > 0 && (
              <Col sm={3} style={{ marginTop: "8px", height: "auto" }}>
                <Card
                  className="text-center"
                  style={{
                    whiteSpace: "pre-wrap",
                    display: "inline-block",
                    verticalAlign: "top",
                    border: "none",
                    marginRight: "10px",
                    overflow: "hidden",
                    backgroundColor: "#1a1a1a",
                    marginTop: "10px",
                  }}
                >
                  <Card.Link
                    href={`/filmler/${item.original_title
                      .split(" ")
                      .join("-")
                      .toLowerCase()}-${item.id}`}
                  >
                    <Card.Img
                      rounded
                      variant="top"
                      src={`http://image.tmdb.org/t/p/w500${item.poster_path}`}
                      style={{ objectFit: "fill", height: "350px" }}
                    />
                  </Card.Link>

                  <Card.Link
                    href={`/filmler/${item.original_title
                      .split(" ")
                      .join("-")
                      .toLowerCase()}-${item.id}`}
                  >
                    <Card.Body>
                      <Card.Title style={{ color: "#ffffff" }}>
                        {item.title}
                      </Card.Title>
                      <Card.Subtitle style={{ marginBottom: "2px" }}>
                        <Badge
                          variant="danger"
                          style={{ verticalAlign: "baseline" }}
                        >
                          {" "}
                          {item.vote_average} Puan
                        </Badge>{" "}
                        <Badge
                          variant="primary"
                          style={{ verticalAlign: "baseline" }}
                        >
                          {" "}
                          {item.vote_count} Oy
                        </Badge>
                      </Card.Subtitle>
                      <Card.Text style={{ color: "#646b6d" }}>
                        {item.overview}
                      </Card.Text>
                    </Card.Body>
                  </Card.Link>
                </Card>
              </Col>
            )
        )}
      </Row>
      <Row style={{ marginTop: "15px", marginBottom: "10px" }}>
        <Pagination style={{ margin: "auto" }} className="pagination">
          <Pagination.Item>
            <Link href={`/film-onerileri/${recomName}/1`}>
              <a>1</a>
            </Link>
          </Pagination.Item>
          <Pagination.Ellipsis />
          {items}
          <Pagination.Ellipsis />
        </Pagination>
      </Row>
      <Footer />

      <style global jsx>
        {`
          body {
            margin: 0px;
            padding: 0px;
            background-color: #000000;
          }
          .pagination {
          }
          a {
            color: #ffffff;
          }
          a:hover {
            color: #dc3545;
          }
          .page-link,
          .page-item {
            background-color: #1a1a1a;
          }
          .pagination > li > a {
            background-color: white;
            border: none;
            color: #ffffff;
            background-color: #1a1a1a;
          }
          h1 {
            color: #ffffff;
            padding-left: 10px;
            padding-right: 10px;
          }
        `}
      </style>
    </Container>
  );
}

export async function getServerSideProps({ query }) {
  const page = query.page;
  let title = query.recomName;
  const recomName = query.recomName;
  let resData = "";
  let data = "";
  let description = "";
  if (
    recomName.includes("siddetle-tavsiye-2020-yilinda-cikmis-film-onerileri")
  ) {
    resData = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=94ec2f0211fe06a3b2bc9827439383d8&language=tr-TR&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&primary_release_year=2020&vote_count.gte=600&page=${page}`
    );
    data = await resData.json();
    title = "Şiddetle Tavsiye 2020 Yılında Çıkmış Film Önerileri";
    description =
      "Bugün bir film izlemek istediniz ancak hangi filmi izleyeceğinize henüz karar veremediniz mi ? Sizler için 2020 yılına ait en iyi film önerilerini topladık. Hazırladığımız listede en güncel film önerilerini ve 2020'nin en iyi filmlerini bulacaksınız. Hadi film önerilerine bakalım...";
  }

  return {
    props: {
      data,
      title,
      description,
    },
  };
}

export default movieDetail;
