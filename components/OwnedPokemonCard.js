import { capitalize } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { PokemonContext } from '../pages/_app';
import Button from './Button';

const OwnedPokemonCard = ({ pokemon }) => {
  const { handleRemovePokemon, catchedPokemons } = useContext(PokemonContext);

  const pokemonOwned = catchedPokemons.filter((poke) => poke.name === pokemon.name).length;

  const router = useRouter();
  const handleRedirect = (pokemonName) => {
    router.push(`/pokemons/${pokemonName}`);
  }

  const handleRelease = (pokemonNickname) => {
    handleRemovePokemon(pokemonNickname);
  }

  return (
    <div className='col-span-2 w-full bg-white rounded-md drop-shadow-md 
      p-5 gap-y-3'
    >
      <div className='flex items-center justify-center -mt-4'>
        <Image height={512} width={512} src={pokemon.thumbnail} alt={pokemon.name} />
      </div>
      <div className='flex flex-col justify-center col-span-2 gap-y-1'>
        <div className='font-poppins font-medium text-center'>
          <h2 className='text-xl'>{capitalize(pokemon.name)}#{pokemon.id}</h2>
          <p>{pokemon.nickname}</p>
          <p data-testid={'owned-count'} className='font-poppins font-normal text-sm'>
            Owned: <span>{pokemonOwned}</span>
          </p>
        </div>
      </div>
      <div className='flex flex-col gap-y-2 col-span-2 mt-5 order-3'>
        <Button data-testid={'release-btn'} onClick={() => handleRelease(pokemon.nickname)}
          type={'danger'}>
          Release
        </Button>
        <Button data-testid={'details-btn'} onClick={() => handleRedirect(pokemon.name)}>
          Details
        </Button>
      </div>
    </div>
  );
}

export default OwnedPokemonCard;