import { useEffect, useState } from 'react';
import { Pizza } from '../types/Pizza';
import apiClient from '../api/apiClient';
import '../styles/PizzasStyle.css';
import { Container, Navbar, Nav, NavDropdown, Card, Button } from 'react-bootstrap';
import { Bounce, Slide, toast, Zoom } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PizzasPage = () => {
    const [data, setData] = useState(Array<Pizza>);
    const pizzak_kosar: Array<Pizza> = [];
    const navigate = useNavigate();

    useEffect(() => {
        apiClient
            .get('/pizzak')
            .then((res) => setData(res.data))
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <body>
            <div id="navbar">
                <Navbar expand="lg" className="bg-body-tertiary" bg="light" data-bs-theme="light">
                    <Container>
                        <Navbar.Brand href="/pizzak">𝓕𝓻𝓮𝓪𝓴𝔂𝓟𝓲𝔃𝔷𝓪</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/pizzak">Pizzák</Nav.Link>
                                <Nav.Link href="/kosar">Kosár</Nav.Link>
                                <NavDropdown title="Admin műveletek" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/ujpizza">Hozzáadás</NavDropdown.Item>
                                    <NavDropdown.Item href="/pizzaszerk">
                                        Szerkesztés és törlés
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <h1>Pizzáink</h1>
            <div id="pizzaKartyak">
                {data.map((e) => (
                    <Card style={{ width: '18rem' }} className="kartya">
                        <Card.Img
                            variant="top"
                            src={'http://localhost:8001/api/kepek/' + e.imageUrl}
                            style={{ width: '150px', margin: 'auto' }}
                        />
                        <Card.Body>
                            <Card.Title>{e.nev}</Card.Title>
                            <Card.Text>{e.leiras}</Card.Text>
                            <Card.Text style={{ textAlign: 'center' }}>{e.ar} Ft</Card.Text>
                        </Card.Body>
                        <Card.Footer className="cardFooter">
                            <Button
                                variant="secondary"
                                style={{ margin: '10px' }}
                                onClick={() => {
                                    pizzak_kosar.push(e);
                                    localStorage.setItem('kosar', JSON.stringify(pizzak_kosar));
                                    toast.success('Pizza sikeresen hozzáadva kosárhoz!', {
                                        position: 'top-right',
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: 'light',
                                        transition: Zoom,
                                    });
                                }}
                            >
                                Kosárba
                            </Button>
                            <Button variant="secondary" onClick={() => navigate(`/pizzak/${e.id}`)}>
                                Megtekintés
                            </Button>
                        </Card.Footer>
                    </Card>
                ))}
            </div>
        </body>
    );
};

export default PizzasPage;
