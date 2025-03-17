import { useEffect, useState } from 'react';
import { Pizza } from '../types/Pizza';
import apiClient from '../api/apiClient';
import '../styles/PizzasStyle.css';
import {
    Container,
    Navbar,
    Nav,
    NavDropdown,
    Card,
    Button,
    Modal,
    Form,
    FormLabel,
} from 'react-bootstrap';
import { Bounce, Slide, toast, Zoom } from 'react-toastify';
import { useParams } from 'react-router-dom';
import NavbarComp from '../components/NavbarComp';

const ModifyPizzaPage = () => {
    const [data, setData] = useState(Array<Pizza>);
    const [show, setShow] = useState(false);
    const [newAr, setNewAr] = useState(1);
    const [nev, setNev] = useState('');
    const [leiras, setLeiras] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [id, setId] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = (id: number) => {
        setId(id);
        setShow(true);
    };

    useEffect(() => {
        apiClient
            .get('/pizzak')
            .then((res) => setData(res.data))
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const modify = (id?: number) => {
        const pizza = {
            ar: newAr,
        };
        console.log(pizza);
        apiClient
            .patch(`/pizzak/${id}/price`, pizza)
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
                            theme: 'colored',
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

    const torles = (id?: number) => {
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
                        setTimeout(function () {
                            window.location.reload();
                        }, 5000);
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
                                variant="secondary"
                                style={{ margin: '10px' }}
                                onClick={() => handleShow(e.id ?? 0)}
                            >
                                Szerkesztés
                            </Button>
                            <Button variant="danger" onClick={() => torles(e.id)}>
                                Törlés
                            </Button>
                        </Card.Footer>
                    </Card>
                ))}
            </div>
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ár szerkesztése</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Új ár:</Form.Label>
                                <Form.Control
                                    value={newAr}
                                    onChange={(e) => setNewAr(Number(e.target.value))}
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
                                modify(id);
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

export default ModifyPizzaPage;
