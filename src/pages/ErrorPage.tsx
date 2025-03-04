import { useEffect, useState } from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

const ErrorPage = () => {
    return (
        <body>
            <div id="navbar">
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
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <h1>404 Az oldal nem található</h1>
        </body>
    );
};

export default ErrorPage;
