import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PizzasPage from './pages/PizzasPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import BasketPage from './pages/BasketPage';
import ErrorPage from './pages/ErrorPage';
import ModifyPizzaPage from './pages/ModifyPizzaPage';
import UjPizzaPage from './pages/UjPizzaPage';
import { ToastContainer } from 'react-toastify';
import PizzaPage from './pages/PizzaPage';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/pizzak" element={<PizzasPage />} />
                <Route path="/kosar" element={<BasketPage />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="/pizzaszerk" element={<ModifyPizzaPage />} />
                <Route path="/ujpizza" element={<UjPizzaPage />} />
                <Route path='/pizzak/:id' element={<PizzaPage/>}/>
            </Routes>
        </BrowserRouter>
        <ToastContainer />
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
