import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { PokemonContext } from '../pages/_app';

const pokeball = require('../assets/img/pokeball.svg');

export default function Navbar() {
  const { catchedPokemons } = useContext(PokemonContext)

  return (
    <div className='fixed flex items-center justify-center w-full h-20 bg-white drop-shadow-lg 
      z-30'>
      <div className='flex items-center justify-between mx-auto w-full p-5 sm:max-w-screen-sm
        md:max-w-screen-md lg:max-w-screen-lg'>
        <Link href={'/'}>
          <a><h1 className='text-4xl font-bold'>POKE</h1></a>
        </Link>
        <Link href={'/pokemons'}>
          <a data-testid='pokeball'>
            <div className='flex items-center gap-x-2'>
              <p>({catchedPokemons.length})</p>
              <Image src={pokeball} width={40} height={40} alt='my pokemon' />
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}
