import { createContext, useEffect, useState } from 'react';
import Layout from '../layouts/Layout';
import '../styles/globals.css';

export const PokemonContext = createContext();

function App({ Component, pageProps }) {
  const [catchedPokemons, setCatchedPokemons] = useState([]);

  const handleAddPokemon = ({ name, id, nickname, thumbnail }) => {
    const updatedCatchedPokemon = [...catchedPokemons, { name, id, nickname, thumbnail }];
    setCatchedPokemons(updatedCatchedPokemon);

    localStorage.setItem('catchedPokemons', JSON.stringify(updatedCatchedPokemon));
  }

  const handleRemovePokemon = (nickname) => {
    const updatedCatchedPokemon = catchedPokemons.filter(pokemon => pokemon.nickname !== nickname);
    setCatchedPokemons(updatedCatchedPokemon);

    localStorage.setItem('catchedPokemons', JSON.stringify(updatedCatchedPokemon));
  }

  useEffect(() => {
    const catchedPokemons = JSON.parse(localStorage.getItem('catchedPokemons')) || [];
    setCatchedPokemons(catchedPokemons);
  }, [])

  return (
    <PokemonContext.Provider value={{ catchedPokemons, handleAddPokemon, handleRemovePokemon }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PokemonContext.Provider>
  );
}

export default App;
