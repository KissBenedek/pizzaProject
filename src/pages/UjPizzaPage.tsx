import { useState } from 'react';
import apiClient from '../api/apiClient';
import { Pizza } from '../types/Pizza';
import { toast, Zoom } from 'react-toastify';
import '../styles/UjPizzaStyle.css';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
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
            </div>
        </body>
    );
};

export default UjPizzaPage;
