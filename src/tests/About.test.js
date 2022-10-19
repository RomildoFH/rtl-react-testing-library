import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    const paragraph1 = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémons');
    const paragraph2 = screen.getByText('One can filter Pokémons by type, and see more details for each one of them');
    const pokedexImg = screen.getByAltText('Pokédex');

    expect(aboutTitle).toBeInTheDocument();
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
    expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
