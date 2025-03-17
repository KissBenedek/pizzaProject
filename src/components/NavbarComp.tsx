import { Container, Nav, NavDropdown, Button, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, Zoom } from 'react-toastify';

const NavbarComp = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem('authToken');
        navigate('/');
        toast.success('Sikeres bejelentkezés!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Zoom,
        });
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="/">𝓕𝓻𝓮𝓪𝓴𝔂𝓟𝓲𝔃𝔷𝓪</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Pizzák</Nav.Link>
                        <Nav.Link href="/kosar">Kosár</Nav.Link>
                        <NavDropdown title="Admin műveletek" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/ujpizza">Hozzáadás</NavDropdown.Item>
                            <NavDropdown.Item href="/pizzaszerk">
                                Szerkesztés és törlés
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    {sessionStorage.getItem('authToken') ? (
                        <Nav.Item>
                            <Button onClick={handleLogout}>Kijelentkezés</Button>
                        </Nav.Item>
                    ) : (
                        <Nav>
                            <Nav.Link href="/login">
                                <Button>Bejelentkezés</Button>
                            </Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default NavbarComp;
