import { useState } from 'react';
import apiClient from '../api/apiClient';
import { Pizza } from '../types/Pizza';
import { toast, Zoom } from 'react-toastify';
import '../styles/UjPizzaStyle.css';
import { Button, Card, Container, Nav, Navbar, NavDropdown, Form } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';
import NavbarComp from '../components/NavbarComp';

const UjPizzaPage = () => {
    const [ar, setAr] = useState(1);
    const [nev, setNev] = useState('');
    const [leiras, setLeiras] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const { id } = useParams();

    const hozzaad = () => {
        const pizza = {
            nev,
            leiras,
            ar,
            imageUrl,
        } as Pizza;

        apiClient
            .post('/pizzak', pizza)
            .then((res) => {
                switch (res.status) {
                    case 201:
                        toast.success('Sikeres hozzáadás', {
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
                        setTimeout(function () {
                            window.location.reload();
                        }, 2000);
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
                            theme: 'colored',
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
                            theme: 'colored',
                            transition: Zoom,
                        });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <body>
            <div id="navbar">
                <NavbarComp />
            </div>
            <Container className="d-flex justify-content-center mt-5">
                <Card style={{ width: '22rem' }} className="p-4 shadow">
                    <Card.Body>
                        <Card.Title className="text-center">Új pizza hozzáadás</Card.Title>
                        <Form>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Név</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Margaréta"
                                    value={nev}
                                    onChange={(e) => setNev(e.target.value)}
                                />
                                <Form.Text>Adja meg a pizza nevét</Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Leírás</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Finom pizza"
                                    value={leiras}
                                    onChange={(e) => setLeiras(e.target.value)}
                                />
                                <Form.Text>Adja meg a pizza leírását</Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPrice">
                                <Form.Label>Ár</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={ar}
                                    onChange={(e) => setAr(Number(e.target.value))}
                                />
                                <Form.Text>Adja meg a pizza árát</Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Leírás</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="example.jpg"
                                    value={leiras}
                                    onChange={(e) => setLeiras(e.target.value)}
                                />
                                <Form.Text>Adja meg a pizza képének nevét</Form.Text>
                            </Form.Group>
                            <Button variant="primary" onClick={() => hozzaad()}>
                                Hozzáadás
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </body>
    );
};

export default UjPizzaPage;
