import { useEffect, useState } from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import NavbarComp from '../components/NavbarComp';

const ErrorPage = () => {
    return (
        <body>
            <div id="navbar">
                <NavbarComp />
            </div>
            <h1>404 Az oldal nem található</h1>
        </body>
    );
};

export default ErrorPage;
