import { capitalize } from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { PokemonContext } from "../pages/_app";
import Button from "./Button";

const OwnedPokemonCard = ({ pokemon }) => {
  const { handleRemovePokemon } = useContext(PokemonContext);

  const router = useRouter();
  const handleRedirect = (pokemonName) => {
    router.push(`/pokemons/${pokemonName}`);
  }

  const handleRelease = (pokemonNickname) => {
    handleRemovePokemon(pokemonNickname);
  }

  return (
    <div className='grid grid-cols-2 col-span-2 w-full bg-white rounded-md drop-shadow-md 
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
  );
}

export default OwnedPokemonCard;