import InfiniteScroll from 'react-infinite-scroll-component';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import PokemonListCard from './PokemonListCard';
import { PokemonContext } from '../pages/_app';

const PokemonsList = ({ data }) => {
  const [pokemons, setPokemons] = useState(data);
  const [hasMore, setHasMore] = useState(true);

  const [formattedCatchedPokemons, setFormattedCatchedPokemons] = useState([]);
  const { catchedPokemons } = useContext(PokemonContext);

  useEffect(() => {
    const catchedPokemonsFormatted = catchedPokemons.reduce((acc, pokemon) => {
      if (acc[pokemon.name]) {
        acc[pokemon.name].count++;
      } else {
        acc[pokemon.name] = {
          id: pokemon.id,
          count: 1
        };
      }
      return acc;
    }, {});

    setFormattedCatchedPokemons(catchedPokemonsFormatted);
  }, [catchedPokemons]);

  const getMorePokemons = async () => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${pokemons.length}&limit=20`)
    const newPokemons = res.data.results

    setPokemons((pokemon) => [...pokemon, ...newPokemons]);
    if (pokemons.length >= newPokemons.count) {
      setHasMore(false);
    }
  };

  return (
    <InfiniteScroll
      id={'pokemons-list'}
      dataLength={pokemons.length}
      next={getMorePokemons}
      hasMore={hasMore}
      loader={<h3> Loading...</h3>}
      endMessage={<h4>Nothing more to show</h4>}
      className='grid grid-cols-2 sm:grid-cols-3 gap-3'
    >
      {pokemons.map((pokemon, index) => (
        <PokemonListCard
          pokemon={pokemon}
          catchedPokemons={formattedCatchedPokemons}
          index={index}
          key={pokemon.name}
        />
      ))}
    </InfiniteScroll>
  );
};

export default PokemonsList;