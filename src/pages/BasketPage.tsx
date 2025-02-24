import { useEffect, useState } from 'react';
import { Pizza } from '../types/Pizza';
import apiClient from '../api/apiClient';
import '../styles/BasketStyle.css';
import { Container, Navbar, Nav, NavDropdown, Card, Button, Table } from 'react-bootstrap';
import { Bounce, Slide, toast, Zoom } from 'react-toastify';
import { redirect } from 'react-router-dom';

const BasketPage = () => {
    const storedItems = localStorage.getItem('kosar');
    const rendeltPizzak: Array<Pizza> = storedItems ? JSON.parse(storedItems) : [];
    const [osszesAr, setOsszesAr] = useState(0);

    return (
        <body>
            <div style={{ marginBottom: '25px' }}>
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
            <div className="tablazat">
                <h1>Kosár</h1>
                <div>
                    <Table bordered striped hover className="tabla">
                        <tr>
                            <th>Pizza</th>
                            <th>Név</th>
                            <th>Leírás</th>
                            <th>Ár</th>
                        </tr>
                        {rendeltPizzak.map((rendelt) => (
                            <tr>
                                <td>
                                    <img
                                        src={'http://localhost:8001/api/kepek/' + rendelt.imageUrl}
                                        alt="pizzakép"
                                        style={{ width: '150px', height: '150px' }}
                                    />
                                </td>
                                <td>{rendelt.nev}</td>
                                <td>{rendelt.leiras}</td>
                                <td>{rendelt.ar} Ft</td>
                            </tr>
                        ))}
                    </Table>
                </div>

                <h3>Összesen: {rendeltPizzak.reduce((ossz, sz) => ossz + sz.ar, 0)} Ft</h3>
            </div>
        </body>
    );
};

export default BasketPage;
