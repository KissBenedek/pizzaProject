import { useEffect, useState } from 'react';
import { Pizza } from '../types/Pizza';
import apiClient from '../api/apiClient';
import '../styles/PizzasStyle.css';
import { Container, Navbar, Nav, NavDropdown, Card, Button } from 'react-bootstrap';
import { Bounce, Slide, toast, Zoom } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import NavbarComp from '../components/NavbarComp';

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
                <NavbarComp />
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
                                variant="success"
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
                                        theme: 'colored',
                                        transition: Zoom,
                                    });
                                }}
                            >
                                Kosárba
                            </Button>
                            <Button variant="primary" onClick={() => navigate(`/pizzak/${e.id}`)}>
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
