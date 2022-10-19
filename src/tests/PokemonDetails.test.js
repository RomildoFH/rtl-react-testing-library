import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <PokemonDetails.js />', () => {
  const moreDetailsLinkName = 'More details';

  it('Ao clicar no link de navegação do pokémon, é feito o redirecionamento da aplicação para a página de detalhes de pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: moreDetailsLinkName });

    userEvent.click(detailsLink);

    act(() => {
      history.push(`/pokemons/${pokemons[0].id}`);
    });

    const pokemonDetailsTitle = screen.getByRole('heading', { level: 2, name: `${pokemons[0].name} Details` });
    const summaryTitle = screen.getByRole('heading', { level: 2, name: 'Summary' });
    const pokemonSummary = screen.getByText(`${pokemons[0].summary}`);

    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
    expect(pokemonDetailsTitle).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    expect(summaryTitle).toBeInTheDocument();
    expect(pokemonSummary).toBeInTheDocument();
  });

  it('Existe na página uma seção com os mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: moreDetailsLinkName });

    userEvent.click(detailsLink);

    act(() => {
      history.push(`/pokemons/${pokemons[0].id}`);
    });

    const locations = pokemons[0].foundAt;
    const numberLocations = locations.length;
    const summaryTitle = screen.getByRole('heading', { level: 2, name: `Game Locations of ${pokemons[0].name}` });
    const locationsImgs = screen.getAllByAltText(`${pokemons[0].name} location`);

    locationsImgs.forEach((element, index) => expect(element).toHaveAttribute('src', `${pokemons[0].foundAt[index].map}`));

    // expect(locationsImgs[0]).toBeInTheDocument();

    expect(summaryTitle).toBeInTheDocument();
    expect(locationsImgs.length).toBe(numberLocations);
  });

  it('O usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: moreDetailsLinkName });

    userEvent.click(detailsLink);

    act(() => {
      history.push(`/pokemons/${pokemons[0].id}`);
    });

    const favoriteInput = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteInput).toBeInTheDocument();
    expect(favoriteInput).toHaveAttribute('type', 'checkbox');
    expect(favoriteInput).not.toBeChecked();

    userEvent.click(favoriteInput);
    expect(favoriteInput).toBeChecked();

    const favoriteStar = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favoriteStar).toBeInTheDocument();
    expect(favoriteStar).toHaveAttribute('src', '/star-icon.svg');

    userEvent.click(favoriteInput);
    expect(favoriteInput).not.toBeChecked();

    expect(favoriteStar).not.toBeInTheDocument();
  });
});
