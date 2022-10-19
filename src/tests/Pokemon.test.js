import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  const moreDetailsLinkName = 'More details';

  it('É renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    // O nome correto do pokémon deve ser mostrado na tela;
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(pokemons[0].name);

    // O tipo correto do pokémon deve ser mostrado na tela;
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(pokemons[0].type);

    // O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida;
    const pokemonWeigth = screen.getByTestId('pokemon-weight');
    expect(pokemonWeigth).toHaveTextContent(pokemons[0].averageWeight.value);
    expect(pokemonWeigth).toHaveTextContent(pokemons[0].averageWeight.measurementUnit);

    // A imagem do pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon.
    const pokemonImg = screen.getByAltText(`${pokemons[0].name} sprite`);
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('src', `${pokemons[0].image}`);
  });

  it('O card do pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste pokémon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: moreDetailsLinkName });
    expect(detailsLink).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
  });

  it('Ao clicar no link de navegação do pokémon, é feito o redirecionamento da aplicação para a página de detalhes de pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: moreDetailsLinkName });

    userEvent.click(detailsLink);

    act(() => {
      history.push(`/pokemons/${pokemons[0].id}`);
    });

    const pokemonDetailsTitle = screen.getByRole('heading', { level: 2, name: `${pokemons[0].name} Details` });

    expect(pokemonDetailsTitle).toBeInTheDocument();
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('Existe um ícone de estrela nos pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: moreDetailsLinkName });

    userEvent.click(detailsLink);

    act(() => {
      history.push(`/pokemons/${pokemons[0].id}`);
    });

    const favoriteInput = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteInput).toBeInTheDocument();
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
