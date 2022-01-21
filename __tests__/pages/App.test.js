import { render } from '@testing-library/react';
import { mockPokemons } from '../../fixtures/PokemonFixtures';
import App from '../../pages/_app';
import Home from '../../pages/index';

describe('App', () => {
  describe('#render', () => {
    it('should render App page correctly when loaded', async () => {
      const props = { pokemons: mockPokemons };
      const { container } = render(
        <App Component={Home} pageProps={{ ...props }} />
      );

      expect(container).toMatchSnapshot();
    });
  });
});