import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Dropdown from 'react-bootstrap/Dropdown'
import { FaGoogle } from 'react-icons/fa';
function mNavbar() {

    return (
        <Navbar variant="dark" expand="lg" style={{backgroundColor:'#121212'}}>
            <Navbar.Brand href="/">Plumovi</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Anasayfa</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Profil" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">İzlediklerim</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Çıkış Yap</NavDropdown.Item>
                    </NavDropdown>
                    <Button variant="danger" style={{marginLeft:'3px'}}>
                        <FaGoogle /> Giriş Yap
                    </Button>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Örn: Yüzüklerin Efendisi" className="mr-sm-2" />
                    <Button variant="danger">Ara</Button> 
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default mNavbar;