import Head from 'next/head'
import firebase from '../src/firebase'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGoogle } from 'react-icons/fa';



const SignIn = () => {
    const auth = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().languageCode = 'tr';
        firebase.auth().signInWithPopup(provider).then(function (result) {
          console.log(result.user)
          const token = result.credential.accessToken;
          const user = result.user;
          const uid = user.uid;
          const db = firebase.firestore();
          var docRef = db.collection("Users").doc(uid);
    
          docRef.get().then(function (doc) {
            if (doc.exists) {
              console.log("Document data:", doc.data());
            } else {
              db.collection("Users").doc(uid).set({
                email: user.email,
              })
                .then(function () {
                  console.log("Document successfully written!");
                })
                .catch(function (error) {
                  console.error("Error writing document: ", error);
                });
              console.log("No such document!");
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