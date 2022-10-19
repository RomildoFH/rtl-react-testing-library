import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const notFoundTitle = screen.getByRole('heading', { level: 2, name: 'Page requested not found' });
    const notFoundImg = screen.getByAltText('Pikachu crying because the page requested was not found');

    expect(notFoundTitle).toBeInTheDocument();
    expect(notFoundImg).toBeInTheDocument();
    expect(notFoundImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
