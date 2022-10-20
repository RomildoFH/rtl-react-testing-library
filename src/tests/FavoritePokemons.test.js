import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { FavoritePokemons } from '../pages';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavoriteMsg = screen.getByText('No favorite pokemon found');

    expect(noFavoriteMsg).toBeInTheDocument();
  });

  it('Quando existem pokemons favoritados eles são renderizados na tela', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: 'More details' });

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

    act(() => {
      history.push('/favorites');
    });
    expect(history.location.pathname).toBe('/favorites');

    const pokemonFavoriteNames = screen.getAllByTestId('pokemon-name');
    expect(pokemonFavoriteNames[0]).toHaveTextContent(pokemons[0].name);
  });
});
