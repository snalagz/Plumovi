import Head from 'next/head'
import firebase from '../src/firebase'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGoogle } from 'react-icons/fa';



const SignIn = () => {
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
          localStorage.setItem("uid", uid);
          console.log(localStorage);
        } else {
          db.collection("Users").doc(uid).set({
            email: user.email,
            displayName: user.displayName,
            photoURL: user.phoneNumber,
          })
            .then(function () {
              console.log("Document successfully written!");
              localStorage.setItem("uid", uid);
              console.log(localStorage);
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
    });
  }
  return (
    <div>
      <Head>
        <title>Giriş Yap</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
      </Head>
      <Container>
        <Form>
          <br />
          <Form.Group controlId="formBasicPassword">
            <Button variant="danger" block onClick={() => auth()}>
              <FaGoogle /> Google Hesabınla Giriş Yap
                    </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  )
}

export default SignIn;