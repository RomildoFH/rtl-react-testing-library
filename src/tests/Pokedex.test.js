import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';
import removeDuplicates from './helpers/removeDuplicates';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const encountredText = screen.getByRole('heading', { level: 2, name: 'Encountered pokémons' });

    expect(encountredText).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);

    const lista = pokemons;
    const ultimoIndex = lista.length - 1;
    let currentIndex = 0;
    const testIdName = 'pokemon-name';

    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextButton).toBeInTheDocument();

    let pokemonName = screen.getAllByTestId(testIdName);
    expect(pokemonName.length).toBe(1);
    expect(pokemonName[0].innerHTML).toBe(pokemons[0].name);

    userEvent.click(nextButton);
    if (currentIndex <= ultimoIndex) {
      currentIndex += 1;
    } else {
      currentIndex = 0;
    }

    pokemonName = screen.getAllByTestId(testIdName);
    if (pokemonName[0].innerHTML === pokemons[ultimoIndex].name) {
      userEvent.click(nextButton);

      expect(pokemonName.length).toBe(1);
      expect(pokemonName[0].innerHTML).toBe(pokemons[0].name);
    }

    pokemonName = screen.getAllByTestId(testIdName);
    expect(pokemonName.length).toBe(1);
    expect(pokemonName[0].innerHTML).toBe(pokemons[currentIndex].name);
  });

  it('Deve existir um botão de filtragem para cada tipo de pokémon, sem repetição', () => {
    renderWithRouter(<App />);
    const pokemonsTypes = removeDuplicates(pokemons);
    const typesQuantity = pokemonsTypes.length;
    // console.log(typesQuantity);
    const pokemonTypeTestId = 'pokemon-type';
    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons.length).toBe(typesQuantity);

    expect(filterButtons[1].innerHTML).toBe(pokemonsTypes[1]);
    userEvent.click(filterButtons[1]);

    const filtredPokemonType = screen.getAllByTestId(pokemonTypeTestId);
    expect(filtredPokemonType.length).toBe(1);
    expect(filtredPokemonType[0].innerHTML).toBe(pokemonsTypes[1]);
    expect(btnAll).toBeInTheDocument();

    expect(filterButtons[4].innerHTML).toBe(pokemonsTypes[4]);
    userEvent.click(filterButtons[4]);

    const filtredPokemonType2 = screen.getAllByTestId(pokemonTypeTestId);
    expect(filtredPokemonType2.length).toBe(1);
    expect(filtredPokemonType2[0].innerHTML).toBe(pokemonsTypes[4]);
    expect(btnAll).toBeInTheDocument();

    userEvent.click(btnAll);

    const filtredPokemonType3 = screen.getAllByTestId(pokemonTypeTestId);
    expect(filtredPokemonType3.length).toBe(1);
    expect(filtredPokemonType3[0].innerHTML).toBe(pokemonsTypes[0]);
    expect(btnAll).toBeInTheDocument();
  });
});
