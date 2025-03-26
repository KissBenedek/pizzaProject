import { render, screen } from '@testing-library/react';
import PizzasPage from '../pages/PizzasPage';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

test('a / útvonalon megjelenik a Hello World szöveg', () => {
    render(
        <MemoryRouter>
            <PizzasPage />
        </MemoryRouter>,
    );

    expect(screen.getByText('Pizzáink')).toBeInTheDocument();
});
