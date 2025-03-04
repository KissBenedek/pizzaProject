import { useState } from 'react';
import { toast, Zoom } from 'react-toastify';
import { Form, Button, Container, Card, Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        if (username && password) {
            const credentials = btoa(`${username}:${password}`);
            sessionStorage.setItem('authToken', `Basic ${credentials}`);
            setIsAuthenticated(true);
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
        } else {
            toast.error('Hibás bejelentkezési adatok!', {
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
        }
    };

    const handleApiCall = () => {
        const authToken = sessionStorage.getItem('authToken');
        if (authToken) {
            toast.info(`Fiktív API-hívás megtörtént ezzel a tokennel: ${authToken}`, {
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
        } else {
            toast.error('Nincs autentikációs token.', {
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
        }
    };

    return (
        <body>
            <div id="navbar">
                <Navbar expand="lg" className="bg-body-tertiary" bg="colored" data-bs-theme="colored">
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
                            <Nav>
                                <Nav.Link href="/login">
                                    <Button>Bejelentkezés</Button>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <Container className="d-flex justify-content-center mt-5">
                {!isAuthenticated ? (
                    <Card style={{ width: '22rem' }} className="p-4 shadow">
                        <Card.Body>
                            <Card.Title className="text-center">Bejelentkezés</Card.Title>
                            <Form>
                                <Form.Group className="mb-3" controlId="formUsername">
                                    <Form.Label>Felhasználónév</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Adja meg felhasználónevét"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Jelszó</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Adja meg jelszavát"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" className="w-100" onClick={handleLogin}>
                                    Bejelentkezés
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                ) : (
                    <Card style={{ width: '22rem' }} className="p-4 shadow">
                        <Card.Body>
                            <Card.Title className="text-center">Sikeres bejelentkezés!</Card.Title>
                            <Button variant="success" className="w-100" onClick={handleApiCall}>
                                API hívás
                            </Button>
                        </Card.Body>
                    </Card>
                )}
            </Container>
        </body>
    );
}
