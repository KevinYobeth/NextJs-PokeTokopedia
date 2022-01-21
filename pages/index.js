import axios from 'axios';
import { useEffect, useState } from 'react';
import PokemonsList from '../components/PokemonsList';
import { useContext } from 'react';
import { PokemonContext } from './_app';

export default function Home({ pokemons }) {
  const [formattedCatchedPokemons, setFormattedCatchedPokemons] = useState([]);
  const { catchedPokemons } = useContext(PokemonContext);

  useEffect(() => {
    const catchedPokemonsFormatted = catchedPokemons.reduce((acc, pokemon) => {
      if (acc[pokemon.name]) {
        acc[pokemon.name].count++;
      } else {
        acc[pokemon.name] = {
          id: pokemon.id,
          count: 1
        };
      }
      return acc;
    }, {});

    setFormattedCatchedPokemons(catchedPokemonsFormatted);
  }, [catchedPokemons]);

  return (
    <PokemonsList
      data={pokemons.results} catchedPokemons={formattedCatchedPokemons} />
  );
}

export async function getServerSideProps() {
  const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
  const pokemons = res.data;

  return { props: { pokemons } };
}