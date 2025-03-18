import { useEffect, useState } from 'react';
import NavbarComp from '../components/NavbarComp';
import apiClient from '../api/apiClient';
import { Rendeles } from '../types/Rendeles';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, Zoom } from 'react-toastify';

const OrderPage = () => {
    const [data, setData] = useState(Array<Rendeles>);
    const [username, setUsername] = useState(sessionStorage.getItem('username') ?? '');
    const [password, setPassword] = useState(sessionStorage.getItem('password') ?? '');
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('username')) {
            navigate('/login');
            toast.error('Jelentkezzen be!', {
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
        } else {
            apiClient
                .get('/rendelesek', {
                    auth: {
                        username: username,
                        password: password,
                    },
                })
                .then((res) => setData(res.data))
                .catch((err) => console.error(err));
        }
    }, []);

    return (
        <div>
            <div id="navbar">
                <NavbarComp />
            </div>
            <h1 style={{ textAlign: 'center' }}>Rendelések</h1>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {data.map((e, id) => (
                    <Card style={{ width: '18rem' }} className="kartya">
                        <Card.Body>
                            <Card.Title style={{ textAlign: 'center' }}>
                                Rendelés No. {id + 1}
                            </Card.Title>
                            <Card.Text>
                                <strong>pizzaId:</strong> {e.pizzaId}
                            </Card.Text>
                            <Card.Text>
                                <strong>Mennyiség:</strong> {e.mennyiseg} db
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default OrderPage;
