import { render, screen } from '@testing-library/react';
import { mockCatchedPokemons, mockLocalStorageAfterRemoved, mockLocalStorageCatchedPokemons }
  from '../../../fixtures/PokemonFixtures';
import Layout from '../../../layouts/Layout';
import Pokemons from '../../../pages/pokemons';
import App, { PokemonContext } from '../../../pages/_app';

const mockPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter() {
    return ({
      push: mockPush,
    });
  },
}));
jest.mock('axios');

describe('Pokemons', () => {
  let mockLocalStorage = {
    catchedPokemons: mockLocalStorageCatchedPokemons,
  };

  beforeAll(() => {
    global.Storage.prototype.setItem = jest.fn((key, value) => {
      mockLocalStorage[key] = value;
    })
    global.Storage.prototype.getItem = jest.fn((key) => mockLocalStorage[key]);
  });

  const renderComponent = (catchedPokemons = [], handleRemovePokemon = null) => render(
    <PokemonContext.Provider value={{ catchedPokemons, handleRemovePokemon }}>
      <Layout>
        <Pokemons />
      </Layout>
    </PokemonContext.Provider>
  );

  const renderComponentWithActualContext = () => {
    const props = {};
    return render(
      <App Component={Pokemons} pageProps={{ ...props }} />
    );
  };

  describe('#render', () => {
    it('should render owned pokemons page correctly when loaded', () => {
      const { container } = renderComponent(mockCatchedPokemons);

      expect(container).toMatchSnapshot();
      expect(screen.getByText('kevin')).toBeInTheDocument();
    });

    it('should render text correctly when loaded with no catched pokemons', () => {
      renderComponent();
      const expectedText = 'You don\'t have any pokemon yet';

      expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
  });

  describe('#onClick', () => {
    it('should redirect to pokemon details page when details button is clicked', () => {
      renderComponent(mockCatchedPokemons);
      const detailsButton = screen.getAllByText('Details')[0];

      detailsButton.click();

      expect(mockPush).toHaveBeenCalledWith('/pokemons/pikachu');
    });

    it('should release pokemon when release button is clicked', () => {
      const mockHandleRemovePokemon = jest.fn();
      renderComponent(mockCatchedPokemons, mockHandleRemovePokemon);
      const releaseButton = screen.getAllByText('Release')[1];

      releaseButton.click();

      expect(mockHandleRemovePokemon).toHaveBeenCalledWith('second-kevin');
    });

    it('should call handleRemovePokemon from app.js when pokemon is released', async () => {
      renderComponentWithActualContext();
      const releaseButton = screen.getAllByText('Release')[0];

      releaseButton.click();

      expect(localStorage.setItem)
        .toHaveBeenCalledWith('catchedPokemons', mockLocalStorageAfterRemoved);
    });
  });
});