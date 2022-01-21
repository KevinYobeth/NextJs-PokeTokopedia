import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { capitalize } from "lodash";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

const PokemonsList = ({ data, catchedPokemons }) => {
  const [pokemons, setPokemons] = useState(data);
  const [hasMore, setHasMore] = useState(true);

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
      className="grid grid-cols-2 sm:grid-cols-3 gap-3"
    >
      {pokemons.map((pokemon, index) => (
        <Link href={`/pokemons/${pokemon.name}`} key={pokemon.name}>
          <a>
            <div className='flex flex-col items-center justify-between w-full p-3 bg-white 
              rounded-md drop-shadow-md'>
              <h1 className='font-poppins'>{capitalize(pokemon.name)}</h1>
              <p className='font-poppins text-sm'>
                Owned: <span>{catchedPokemons[pokemon.name]?.count || 0}</span>
              </p>
              <Image width={300} height={300}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${index + 1}.png`} alt="" />
            </div>
          </a>
        </Link>
      ))}
    </InfiniteScroll>
  );
};

export default PokemonsList;