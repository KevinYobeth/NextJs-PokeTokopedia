import Image from 'next/image';
import { useContext } from 'react';
import { capitalize, isEmpty } from 'lodash';
import Button from '../../components/Button';
import { useRouter } from 'next/router';
import { PokemonContext } from '../_app';
import Link from 'next/link';
import Head from 'next/head';

export default function Pokemons() {
  const { catchedPokemons, handleRemovePokemon } = useContext(PokemonContext);

  const router = useRouter();
  const handleRedirect = (pokemonName) => {
    router.push(`/pokemons/${pokemonName}`);
  }

  const handleRelease = (pokemonNickname) => {
    handleRemovePokemon(pokemonNickname);
  }

  return (
    <>
      <Head>
        <title>Your Pokemons - POKE</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3'>
        {!isEmpty(catchedPokemons) ?
          catchedPokemons.slice(0).reverse().map(pokemon => {
            return (
              <div key={pokemon.nickname}
                className='grid grid-cols-2 col-span-2 w-full bg-white rounded-md drop-shadow-md 
                p-5 gap-y-3'
              >
                <div className='flex flex-col justify-center col-span-1 sm:col-span-2 gap-y-1 order-1 
                sm:order-2'>
                  <div className='font-poppins font-medium text-center'>
                    <h2 className='text-xl'>{capitalize(pokemon.name)}#{pokemon.id}</h2>
                    <p>{pokemon.nickname}</p>
                  </div>
                </div>
                <div className='flex items-center justify-center col-span-1 sm:col-span-2 order-2 
                sm:order-1'>
                  <Image height={512} width={512} src={pokemon.thumbnail} alt={pokemon.name} />
                </div>
                <div className='flex flex-col gap-y-2 col-span-2 mt-5 order-3'>
                  <Button data-testid={'release-btn'} onClick={() => handleRelease(pokemon.nickname)}
                    type={'danger'}>Release</Button>
                  <Button data-testid={'details-btn'} onClick={() => handleRedirect(pokemon.name)}>
                    Details
                  </Button>
                </div>
              </div>
            )
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
