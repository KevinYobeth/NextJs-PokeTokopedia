import { render, screen, act, fireEvent } from '@testing-library/react';
import { mockCatchedPokemons, mockPokemonDetails, mockPokemonDetailsResponse }
  from '../../../fixtures/PokemonFixtures';
import Layout from '../../../layouts/Layout';
import Pokemon, { getServerSideProps } from '../../../pages/pokemons/[name]';
import App, { PokemonContext } from '../../../pages/_app';
import axios from 'axios';

jest.mock('axios');
jest.spyOn(window.localStorage.__proto__, 'setItem');
window.localStorage.__proto__.setItem = jest.fn();

describe('Pokemon', () => {
  const renderComponent = (catchedPokemons = [], handleAddPokemon = null,
    thumbnail, name, id, pokemonDetails) => render(
      <PokemonContext.Provider value={{ catchedPokemons, handleAddPokemon }}>
        <Layout>
          <Pokemon thumbnail={thumbnail} name={name} id={id} pokemonDetails={pokemonDetails} />
        </Layout>
      </PokemonContext.Provider>
    );

  const renderComponentWithActualContext = (thumbnail, name, id, pokemonDetails) => {
    const props = { thumbnail, name, id, pokemonDetails };
    return render(
      <App Component={Pokemon} pageProps={{ ...props }} />
    );
  };

  describe('#render', () => {
    it('should render Pokemon pages correctly when loaded', () => {
      const { thumbnail, name, id, pokemonDetails } = mockPokemonDetails;
      const { container } = renderComponent(mockCatchedPokemons, null,
        thumbnail, name, id, pokemonDetails);

      expect(container).toMatchSnapshot();
    });
  });

  describe('#onClick', () => {
    it('should fail to catch pokemon and show fail message when button is invoked', async () => {
      const mockMath = Object.create(global.Math);
      mockMath.random = () => 0.3;
      global.Math = mockMath;
      const { thumbnail, name, id, pokemonDetails } = mockPokemonDetails;
      renderComponent(mockCatchedPokemons, null,
        thumbnail, name, id, pokemonDetails);
      const catchPokemonButton = screen.getByText('Catch charmander');

      await act(async () => {
        await catchPokemonButton.click();
      });

      expect(screen.getByText('Sorry you failed to catch charmander')).toBeInTheDocument();
    });

    it('should succeed to catch pokemon and show success message when button is invoked',
      async () => {
        const mockMath = Object.create(global.Math);
        mockMath.random = () => 0.8;
        global.Math = mockMath;
        const { thumbnail, name, id, pokemonDetails } = mockPokemonDetails;
        renderComponent(mockCatchedPokemons, null,
          thumbnail, name, id, pokemonDetails);
        const catchPokemonButton = screen.getByText('Catch charmander');

        await act(async () => {
          await catchPokemonButton.click();
        });

        expect(screen.getByText('Congratulations! You catch charmander')).toBeInTheDocument();
      });

    it('should succeed to catch pokemon and user should be able to add pokemon to collection when'
      + 'invoked', async () => {
        const mockMath = Object.create(global.Math);
        mockMath.random = () => 0.8;
        global.Math = mockMath;
        const mockHandleAddPokemon = jest.fn();
        const { thumbnail, name, id, pokemonDetails } = mockPokemonDetails;
        renderComponent(mockCatchedPokemons, mockHandleAddPokemon,
          thumbnail, name, id, pokemonDetails);
        const catchButton = screen.getByText('Catch charmander');

        await act(async () => {
          await catchButton.click();
        });
        await act(async () => {
          const addButton = screen.getByText('Add to Collection');
          const nicknameInput = screen.getByTestId('nickname-input');
          await fireEvent.change(nicknameInput, { target: { value: 'budi' } });
          await addButton.click();
        });
        const ownedCount = screen.getByTestId('owned-count');

        expect(screen.getByText('budi is added to your collection!')).toBeInTheDocument();
        expect(ownedCount).toHaveTextContent('2');
        expect(mockHandleAddPokemon)
          .toHaveBeenCalledWith({ name, id, thumbnail, nickname: 'budi' });
      });

    it('should succeed to catch pokemon and user should be able to add pokemon to collection using'
      + 'enter key', async () => {
        const mockMath = Object.create(global.Math);
        mockMath.random = () => 0.8;
        global.Math = mockMath;
        const mockHandleAddPokemon = jest.fn();
        const { thumbnail, name, id, pokemonDetails } = mockPokemonDetails;
        renderComponent(mockCatchedPokemons, mockHandleAddPokemon,
          thumbnail, name, id, pokemonDetails);
        const catchButton = screen.getByText('Catch charmander');

        await act(async () => {
          await catchButton.click();
        });
        await act(async () => {
          const nicknameInput = screen.getByTestId('nickname-input');
          await fireEvent.change(nicknameInput, { target: { value: 'bambang' } });
          await fireEvent.keyPress(nicknameInput, { key: 'Enter', code: 'Enter', charCode: 13 });
        });

        expect(mockHandleAddPokemon)
          .toHaveBeenCalledWith({ name, id, thumbnail, nickname: 'bambang' });
        expect(screen.getByText('bambang is added to your collection!')).toBeInTheDocument();
      });

    it('should succeed to catch pokemon and fail validation when given duplicate or empty name',
      async () => {
        const mockMath = Object.create(global.Math);
        mockMath.random = () => 0.8;
        global.Math = mockMath;
        const { thumbnail, name, id, pokemonDetails } = mockPokemonDetails;
        renderComponent(mockCatchedPokemons, null,
          thumbnail, name, id, pokemonDetails);
        const catchButton = screen.getByText('Catch charmander');

        await act(async () => {
          await catchButton.click();
        });
        await act(async () => {
          const addButton = screen.getByText('Add to Collection');
          const nicknameInput = screen.getByTestId('nickname-input');
          await fireEvent.change(nicknameInput, { target: { value: '' } });
          await addButton.click();
          await fireEvent.change(nicknameInput, { target: { value: 'kevin' } });
          await addButton.click();
        });

        expect(screen.getByText('Nickname must be unique!')).toBeInTheDocument();
      });

    it('should show relevant tab informations when tab category title is clicked', async () => {
      const { thumbnail, name, id, pokemonDetails } = mockPokemonDetails;
      renderComponent(mockCatchedPokemons, null,
        thumbnail, name, id, pokemonDetails);
      const abilitiesTab = screen.getByText('Abilities');
      const movesTab = screen.getByText('Moves');
      const detailsTab = screen.getByText('Details');

      await act(async () => {
        await movesTab.click();
        await detailsTab.click();
        await abilitiesTab.click();
      });

      expect(screen.getByText('Blaze')).toBeInTheDocument();
    });

    it('should call handleAddPokemon from app.js when pokemon is catched', async () => {
      const mockMath = Object.create(global.Math);
      mockMath.random = () => 0.8;
      global.Math = mockMath;
      const { thumbnail, name, id, pokemonDetails } = mockPokemonDetails;
      renderComponentWithActualContext(thumbnail, name, id, pokemonDetails);
      const catchButton = screen.getByText('Catch charmander');

      await act(async () => {
        await catchButton.click();
      });
      await act(async () => {
        const nicknameInput = screen.getByTestId('nickname-input');
        await fireEvent.change(nicknameInput, { target: { value: 'bambang' } });
        await fireEvent.keyPress(nicknameInput, { key: 'Enter', code: 'Enter', charCode: 13 });
      })

      expect(localStorage.setItem).toHaveBeenCalledWith('catchedPokemons',
        JSON.stringify([{ name, id, nickname: 'bambang', thumbnail }]));
    });
  });

  describe('#getServerSideProps', () => {
    it('should call pokemon API to fetch data when page loaded', async () => {
      axios.get.mockResolvedValue({ data: mockPokemonDetailsResponse });

      const response = await getServerSideProps({ params: { name: 'charmander' } });

      expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/charmander');
      expect(response).toEqual({ props: mockPokemonDetails });
    });
  });
});