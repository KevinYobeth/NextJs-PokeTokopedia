import { render } from '@testing-library/react';
import { mockCatchedPokemons, mockPokemons } from '../../fixtures/PokemonFixtures';
import Home from '../../pages/index';
import { PokemonContext } from '../../pages/_app';
import { getServerSideProps } from '../../pages/index';
import axios from 'axios';
import Layout from '../../layouts/Layout';

jest.mock('axios');

describe('Home', () => {
  const renderComponent = (mockPokemons, catchedPokemons = []) => render(
    <PokemonContext.Provider value={{ catchedPokemons }}>
      <Layout>
        <Home pokemons={mockPokemons} />
      </Layout >
    </PokemonContext.Provider>
  );

  describe('#render', () => {
    it('should render component with catched pokemons correctly', async () => {
      const { container } = renderComponent(mockPokemons, mockCatchedPokemons);

      expect(container).toMatchSnapshot();
    });
  });

  describe('#getServerSideProps', () => {
    it('should call pokemon API to fetch data when page loaded', async () => {
      axios.get.mockResolvedValue({ data: mockPokemons });

      const response = await getServerSideProps();

      expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
      expect(response).toEqual({ props: { pokemons: mockPokemons } });
    });
  });
});
