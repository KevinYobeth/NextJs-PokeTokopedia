import axios from 'axios';
import { useEffect, useState } from 'react';
import PokemonsList from '../components/PokemonsList';
import { useContext } from 'react';
import { PokemonContext } from './_app';
import Head from 'next/head';

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
    <>
      <Head>
        <title>Pokemons List - POKE</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <PokemonsList
        data={pokemons.results} catchedPokemons={formattedCatchedPokemons} />
    </>
  );
}

export async function getServerSideProps() {
  const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
  const pokemons = res.data;

  return { props: { pokemons } };
}