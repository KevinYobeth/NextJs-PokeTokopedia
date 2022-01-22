import { capitalize, isArray } from 'lodash';
import { useEffect, useState } from 'react';

const PokemonDetails = ({ pokemonDetails }) => {
  const [tab, setTab] = useState(0);
  const [tabDetails, setTabDetails] = useState(pokemonDetails[tab]);

  useEffect(() => {
    setTabDetails(pokemonDetails[tab]);
  }, [pokemonDetails, tab])

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
    <div className='flex flex-col mb-10'>
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
  );
}

export default PokemonDetails;