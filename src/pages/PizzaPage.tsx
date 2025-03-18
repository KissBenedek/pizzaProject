import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button, Modal, Form, Card } from 'react-bootstrap';
import apiClient from '../api/apiClient';
import { useNavigate, useParams } from 'react-router-dom';
import { Pizza } from '../types/Pizza';
import '../styles/PizzaStyle.css';
import { toast, Zoom } from 'react-toastify';
import NavbarComp from '../components/NavbarComp';

const PizzaPage = () => {
    const [data, setData] = useState<Pizza>();
    const [show, setShow] = useState(false);
    const [ar, setAr] = useState(1);
    const [nev, setNev] = useState('');
    const [leiras, setLeiras] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        apiClient
            .get(`/pizzak/${id}`)
            .then((res) => setData(res.data))
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const torol = (id?: number) => {
        apiClient
            .delete(`/pizzak/${id}`)
            .then((res) => {
                switch (res.status) {
                    case 200:
                        toast.success('Sikeres törlés', {
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
                        navigate('/');
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
        <body id="pizzaBody">
            <div id="navbar">
                <NavbarComp />
            </div>
            <div id="box">
                <Card style={{ width: '500px' }} className="kartya">
                    <Card.Title
                        style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '30px' }}
                    >
                        {data?.nev}
                    </Card.Title>
                    <Card.Img
                        variant="top"
                        src={'http://localhost:8001/api/kepek/' + data?.imageUrl}
                        style={{ width: '300px', height: '300px', margin: 'auto' }}
                    />
                    <Card.Body>
                        <Card.Text style={{ textAlign: 'center' }}>{data?.leiras}</Card.Text>
                        <Card.Text style={{ textAlign: 'center' }}>{data?.ar} Ft</Card.Text>
                    </Card.Body>
                    <Card.Footer className="cardFooter">
                        <Button
                            variant="primary"
                            style={{ margin: '10px' }}
                            onClick={() => handleShow()}
                        >
                            Szerkesztés
                        </Button>
                        <Button variant="danger" onClick={() => torol(data?.id)}>
                            Törlés
                        </Button>
                    </Card.Footer>
                </Card>
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
