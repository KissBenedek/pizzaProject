import { useEffect, useState } from 'react';
import { Pizza } from '../types/Pizza';
import apiClient from '../api/apiClient';
import '../styles/BasketStyle.css';
import { Container, Navbar, Nav, NavDropdown, Card, Button, Table } from 'react-bootstrap';
import { Bounce, Slide, toast, Zoom } from 'react-toastify';
import { redirect } from 'react-router-dom';
import NavbarComp from '../components/NavbarComp';

const BasketPage = () => {
    const storedItems = localStorage.getItem('kosar');
    const rendeltPizzak: Array<Pizza> = storedItems ? JSON.parse(storedItems) : [];
    const szurt: Array<Pizza> = [];
    const [osszesAr, setOsszesAr] = useState(0);

    const urit = () => {
        if (storedItems != null) {
            localStorage.removeItem('kosar');
            toast.success('A kosár kiürítve!', {
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
        } else {
            toast.error('A kosár üres!', {
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
            <div style={{ marginBottom: '25px' }}>
                <NavbarComp />
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
                                <td>
                                    <Button variant="danger">X</Button>
                                </td>
                            </tr>
                        ))}
                    </Table>
                </div>
                <Button variant="danger" id="ossztorles" onClick={() => urit()}>
                    Kosár űrítése
                </Button>
                <h3>Összesen: {rendeltPizzak.reduce((ossz, sz) => ossz + sz.ar, 0)} Ft</h3>
            </div>
        </body>
    );
};

export default BasketPage;
