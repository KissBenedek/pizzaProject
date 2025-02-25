import { useState } from 'react';
import apiClient from '../api/apiClient';
import { Pizza } from '../types/Pizza';
import { toast, Zoom } from 'react-toastify';
import '../styles/UjPizzaStyle.css';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';

const UjPizzaPage = () => {
    const [ar, setAr] = useState(1);
    const [nev, setNev] = useState('');
    const [leiras, setLeiras] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const {id} = useParams();

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
                            theme: 'light',
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
                <h1>Új pizza hozzáadása</h1>
                <p>
                    <b>Név:</b>{' '}
                    <input type="text" value={nev} onChange={(e) => setNev(e.target.value)} />
                </p>
                <p>
                    <b>Leírás:</b>{' '}
                    <input type="text" value={leiras} onChange={(e) => setLeiras(e.target.value)} />
                </p>
                <p>
                    <b>Ár:</b>{' '}
                    <input
                        type="number"
                        value={ar}
                        onChange={(e) => setAr(Number(e.target.value))}
                    />{' '}
                    Ft
                </p>
                <p>
                    <b>Kép URL:</b>{' '}
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </p>
                <Button variant="primary" onClick={() => hozzaad()}>
                    Hozzáadás
                </Button>
                <Button variant="primary">
                    Megtekintés
                </Button>
            </div>
        </body>
    );
};

export default UjPizzaPage;
