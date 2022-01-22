import { capitalize, isEmpty } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { PokemonContext } from '../pages/_app';
import Button from './Button';

const PokemonCard = ({ pokemon }) => {
  const { id, thumbnail, name } = pokemon;

  const { catchedPokemons, handleAddPokemon } = useContext(PokemonContext);

  const [message, setMessage] = useState('');
  const [touched, setTouched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [pokemonCatched, setPokemonCatched] = useState(false);
  const [pokemonNickname, setPokemonNickname] = useState('');
  const [pokemonOwned, setPokemonOwned] = useState(0);

  useEffect(() => {
    const totalOwned = catchedPokemons.filter(pokemon => pokemon.name === name).length;
    setPokemonOwned(totalOwned);
  }, [name, catchedPokemons]);

  const handleCatchPokemon = () => {
    setTouched(true);
    const catchPokemon = Math.random() > 0.5;

    if (catchPokemon) {
      setPokemonCatched(true);
      return setMessage(`Congratulations! You catch ${name}`);
    }
    return setMessage(`Sorry you failed to catch ${name}`);
  };

  const handleSubmitNickname = () => {
    const pokemonNameNotUnique = catchedPokemons
      .find(pokemon => pokemon.nickname === pokemonNickname);

    if (isEmpty(pokemonNickname)) {
      return setErrorMsg('Nickname is required!');
    }
    if (pokemonNameNotUnique) {
      return setErrorMsg('Nickname must be unique!');
    }

    handleAddPokemon({ name, id, nickname: pokemonNickname, thumbnail });

    setMessage(`${pokemonNickname} is added to your collection!`);
    setTouched(false);
    setPokemonNickname('');
    setErrorMsg('');
    setPokemonCatched(false);
  };

  return (
    <div className='flex flex-col self-start justify-self-start w-full md:w-2/5 bg-white 
        rounded-md drop-shadow-md p-5 gap-y-3'>
      <div className='-mt-4'>
        <Image height={512} width={512} src={thumbnail} alt={name} />
      </div>
      <div className='flex flex-col w-full gap-y-5 text-center'>
        <div className='flex flex-col text-center'>
          <h2 className='font-poppins font-medium text-3xl'>{capitalize(name)}#{id}</h2>
          <p data-testid={'owned-count'} className='font-poppins text-sm'>
            Owned: <span>{pokemonOwned}</span>
          </p>
        </div>
        {touched && <p className={`font-poppins text-sm 
            ${pokemonCatched ? 'text-[#0BAE1B]' : 'text-[#E15050]'}`}>{message}</p>}
        {message && !touched && <p className={`font-poppins text-sm text-center text-gray-600}`}>
          {message}
        </p>}
        {pokemonCatched &&
          (
            <div className='flex flex-col gap-y-1'>
              <input data-testid={'nickname-input'}
                className={`w-full rounded-md ${errorMsg ? 'border-red-500' : 'border-gray-300'}`}
                type='text'
                placeholder='Enter Nickname'
                onChange={(e) => setPokemonNickname(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmitNickname()}
              />
              {errorMsg && <p className='text-sm text-[#E15050]'>{errorMsg}</p>}
            </div>
          )}
        <div className='flex flex-col gap-y-2'>
          <Button onClick={pokemonCatched ? handleSubmitNickname : handleCatchPokemon}>
            {pokemonCatched ? 'Add to Collection' : `Catch ${name}`}
          </Button>
          <Link href={'/'}><a className='w-full'><Button type={'secondary'}>
            View All Pokemons
          </Button></a></Link>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;