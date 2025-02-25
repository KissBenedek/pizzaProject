import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button, Modal, Form } from 'react-bootstrap';
import apiClient from '../api/apiClient';
import { useParams } from 'react-router-dom';
import { Pizza } from '../types/Pizza';
import '../styles/PizzaStyle.css';
import { toast, Zoom } from 'react-toastify';

const PizzaPage = () => {
    const [data, setData] = useState<Pizza>();
    const [show, setShow] = useState(false);
    const [ar, setAr] = useState(1);
    const [nev, setNev] = useState('');
    const [leiras, setLeiras] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const { id } = useParams();

    useEffect(() => {
        apiClient
            .get(`/pizzak/${id}`)
            .then((res) => setData(res.data))
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const modify = (id?: number) => {
        const pizza = {
            nev,
            leiras,
            ar,
            imageUrl,
        } as Pizza;
        apiClient
            .put(`/pizzak/${id}`, pizza)
            .then((res) => {
                switch (res.status) {
                    case 200:
                        toast.success('Sikeres módosítás', {
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
                        window.location.reload();
                        break;
                    case 422:
                        toast.error('Validációs hiba', {
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
                        break;
                    default:
                        toast.error('Hiba történt', {
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
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
            <div id="container">
                <div id="kep">
                    <img src={'http://localhost:8001/api/kepek/' + data?.imageUrl} alt="pizzaKép" />
                </div>
                <div id="adatok">
                    <p>
                        <b>Név:</b> {data?.nev}
                    </p>
                    <p>
                        <b>Leirás:</b> {data?.leiras}
                    </p>
                    <p>
                        <b>Ár:</b> {data?.ar}
                    </p>
                    <div id="buttons">
                        <Button variant="primary" onClick={handleShow}>
                            Szerkesztés
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ár szerkesztése</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Új név:</Form.Label>
                                <Form.Control
                                    value={nev}
                                    onChange={(e) => setNev(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Új leírás:</Form.Label>
                                <Form.Control
                                    value={leiras}
                                    onChange={(e) => setLeiras(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Új ár:</Form.Label>
                                <Form.Control
                                    value={ar}
                                    onChange={(e) => setAr(Number(e.target.value))}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Új kép URL:</Form.Label>
                                <Form.Control
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Bezárás
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                modify(data?.id);
                            }}
                        >
                            Mentés
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </body>
    );
};

export default PizzaPage;
