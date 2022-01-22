import axios from 'axios';
import { capitalize } from 'lodash';
import Head from 'next/head';
import PokemonCard from '../../components/PokemonCard';
import PokemonDetails from '../../components/PokemonDetails';

export default function Pokemon({ thumbnail, name, id, pokemonDetails }) {
  return (
    <>
      <Head>
        <title>{capitalize(name)} - POKE</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='flex flex-col md:flex-row gap-5'>
        <PokemonCard pokemon={{ id, name, thumbnail }} />
        <PokemonDetails pokemonDetails={pokemonDetails} />
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
  const pokemon = res.data;

  return {
    props: {
      thumbnail: pokemon.sprites.other.home.front_default,
      name: pokemon.name,
      id: pokemon.id,
      pokemonDetails: [
        {
          id: pokemon.id,
          name: pokemon.name,
          height: `${pokemon.height} decimetres`,
          weight: `${pokemon.weight} hectograms`,
          types: pokemon.types.map(type => capitalize(type.type.name)),
        },
        {
          moves: pokemon.moves.map(move => capitalize(move.move.name)),
        },
        {
          abilities: pokemon.abilities.map(ability => capitalize(ability.ability.name))
        }
      ]
    }
  };
}