import axios from 'axios';
import Image from 'next/image';
import { capitalize, isArray, isEmpty } from 'lodash';
import Button from '../../components/Button';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { PokemonContext } from '../_app';

export default function Pokemon({ thumbnail, name, id, pokemonDetails }) {
  const [tab, setTab] = useState(0);
  const [tabDetails, setTabDetails] = useState(pokemonDetails[tab]);
  const [pokemonCatched, setPokemonCatched] = useState(false);
  const [pokemonNickname, setPokemonNickname] = useState('');
  const [pokemonOwned, setPokemonOwned] = useState(0);
  const [message, setMessage] = useState('');
  const [touched, setTouched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { catchedPokemons, handleAddPokemon } = useContext(PokemonContext);

  useEffect(() => {
    setTabDetails(pokemonDetails[tab]);

    const totalOwned = catchedPokemons.filter(pokemon => pokemon.name === name).length;
    setPokemonOwned(totalOwned);
  }, [tab, pokemonDetails, name, catchedPokemons]);

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

  const renderItem = (key, detail) => {
    return (
      <div className='grid grid-cols-2 w-full'>
        <p className='font-poppins font-medium text-gray-400 col-span-1'>{capitalize(key)}</p>
        <p className='font-poppins font-medium text-black col-span-1'>{capitalize(detail)}</p>
      </div>
    );
  };

  const renderArrayItem = (key, details) => {
    return (
      <div className='grid grid-cols-2 w-full'>
        <p className='font-poppins font-medium text-gray-400 col-span-1'>{capitalize(key)}</p>
        {details.map((detail) => {
          return <p key={detail} className='font-poppins font-medium text-black col-start-2 col-span-1'>
            {capitalize(detail)}
          </p>
        })}
      </div>
    );
  };

  const renderLongArrayItem = (details) => {
    return (
      <div className='grid grid-cols-2 md:grid-cols-4 gap-2 w-full'>
        {details.map((detail) => {
          return <p key={detail} className='font-poppins font-medium text-black col-span-1'>
            {capitalize(detail)}
          </p>
        })}
      </div>
    );
  };

  const renderDetails = (key, details) => {
    const longDetailsKeys = ['moves', 'abilities'];
    if (longDetailsKeys.includes(key)) {
      return renderLongArrayItem(details);
    }
    if (isArray(details)) {
      return renderArrayItem(key, details);
    }
    return renderItem(key, details);
  };

  return (
    <>
      <Head>
        <title>{capitalize(name)} - POKE</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='flex flex-col md:flex-row gap-5'>
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

        <div className='flex flex-col'>
          <div className='flex font-poppins font-medium text-lg w-full gap-x-10 md:mt-0 cursor-pointer'>
            <button onClick={() => setTab(0)} className={tab === 0 ? 'text-black' : 'text-gray-400'}>
              Details
            </button>
            <button onClick={() => setTab(1)} className={tab === 1 ? 'text-black' : 'text-gray-400'}>
              Moves
            </button>
            <button onClick={() => setTab(2)} className={tab === 2 ? 'text-black' : 'text-gray-400'}>Abilities
            </button>
          </div>
          <div className='flex flex-col mt-5'>
            {tabDetails && Object.keys(tabDetails).map((key) => {
              return (
                <div className='flex' key={key}>
                  {renderDetails(key, tabDetails[key])}
                </div>
              );
            })}
          </div>
        </div>
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