import { capitalize } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';

const PokemonListCard = ({ pokemon, catchedPokemons, index }) => {
  return (
    <Link href={`/pokemons/${pokemon.name}`} key={pokemon.name}>
      <a>
        <div className='flex flex-col items-center justify-between w-full p-3 bg-white 
              rounded-md drop-shadow-md'>
          <h1 className='font-poppins'>{capitalize(pokemon.name)}</h1>
          <p className='font-poppins text-sm'>
            Owned: <span>{catchedPokemons[pokemon.name]?.count || 0}</span>
          </p>
          <Image width={300} height={300}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${index + 1}.png`} alt='' />
        </div>
      </a>
    </Link>
  );
}

export default PokemonListCard;