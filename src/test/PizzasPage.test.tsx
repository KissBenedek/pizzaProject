import PizzasPage from '../pages/PizzasPage';
import React from 'react';
import { screen, render } from '@testing-library/react';
import "@testing-library/jest-dom";

test("vicces teszt", () => {
    render(<PizzasPage/>);
    const routeDiv = screen.getByTestId("routediv");
    expect (routeDiv).toBeInTheDocument();
})
