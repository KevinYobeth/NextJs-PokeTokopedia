import axios from 'axios';
import PokemonsList from '../components/PokemonsList';
import Head from 'next/head';

export default function Home({ pokemons }) {
  return (
    <>
      <Head>
        <title>Pokemons List - POKE</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <PokemonsList data={pokemons.results} />
    </>
  );
}

export async function getServerSideProps() {
  const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
  const pokemons = res.data;

  return { props: { pokemons } };
}