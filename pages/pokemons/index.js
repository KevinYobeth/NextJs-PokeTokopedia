import { useContext } from 'react';
import { isEmpty } from 'lodash';
import Button from '../../components/Button';
import { PokemonContext } from '../_app';
import Link from 'next/link';
import Head from 'next/head';
import OwnedPokemonCard from '../../components/OwnedPokemonCard';

export default function Pokemons() {
  const { catchedPokemons } = useContext(PokemonContext);

  return (
    <>
      <Head>
        <title>Your Pokemons - POKE</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3'>
        {!isEmpty(catchedPokemons)
          ?
          catchedPokemons.slice(0).reverse().map(pokemon => {
            return <OwnedPokemonCard pokemon={pokemon} key={pokemon.nickname} />
          })
          : (
            <div className='flex flex-col justify-center items-center gap-y-2 col-span-full'>
              <h2 className='font-poppins font-medium'>You don&#39;t have any pokemon yet</h2>
              <Link href={'/'}><a className='mt-1'><Button>Let&#39;s Catch One!</Button></a></Link>
            </div>
          )
        }
      </div>
    </>
  );
}
