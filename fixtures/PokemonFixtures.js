export const mockPokemons = {
  count: 40,
  next: "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
  previous: null,
  results: [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    },
    {
      name: "ivysaur",
      url: "https://pokeapi.co/api/v2/pokemon/2/",
    },
    {
      name: "venusaur",
      url: "https://pokeapi.co/api/v2/pokemon/3/",
    },
    {
      name: "charmander",
      url: "https://pokeapi.co/api/v2/pokemon/4/"
    },
    {
      name: "charmeleon",
      url: "https://pokeapi.co/api/v2/pokemon/5/"
    },
    {
      name: "charizard",
      url: "https://pokeapi.co/api/v2/pokemon/6/"
    },
    {
      name: "squirtle",
      url: "https://pokeapi.co/api/v2/pokemon/7/"
    },
    {
      name: "wartortle",
      url: "https://pokeapi.co/api/v2/pokemon/8/"
    },
    {
      name: "blastoise",
      url: "https://pokeapi.co/api/v2/pokemon/9/"
    },
    {
      name: "caterpie",
      url: "https://pokeapi.co/api/v2/pokemon/10/"
    },
    {
      name: "metapod",
      url: "https://pokeapi.co/api/v2/pokemon/11/"
    },
    {
      name: "butterfree",
      url: "https://pokeapi.co/api/v2/pokemon/12/"
    },
    {
      name: "weedle",
      url: "https://pokeapi.co/api/v2/pokemon/13/"
    },
    {
      name: "kakuna",
      url: "https://pokeapi.co/api/v2/pokemon/14/"
    },
    {
      name: "beedrill",
      url: "https://pokeapi.co/api/v2/pokemon/15/"
    },
    {
      name: "pidgey",
      url: "https://pokeapi.co/api/v2/pokemon/16/"
    },
    {
      name: "pidgeotto",
      url: "https://pokeapi.co/api/v2/pokemon/17/"
    },
    {
      name: "pidgeot",
      url: "https://pokeapi.co/api/v2/pokemon/18/"
    },
    {
      name: "rattata",
      url: "https://pokeapi.co/api/v2/pokemon/19/"
    },
    {
      name: "raticate",
      url: "https://pokeapi.co/api/v2/pokemon/20/"
    }
  ],
};

export const mockFetchPokemonsPage2 = {
  count: 40,
  next: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20",
  previous: null,
  results: [
    {
      "name": "spearow",
      "url": "https://pokeapi.co/api/v2/pokemon/21/"
    },
    {
      "name": "fearow",
      "url": "https://pokeapi.co/api/v2/pokemon/22/"
    },
    {
      "name": "ekans",
      "url": "https://pokeapi.co/api/v2/pokemon/23/"
    },
    {
      "name": "arbok",
      "url": "https://pokeapi.co/api/v2/pokemon/24/"
    },
    {
      "name": "pikachu",
      "url": "https://pokeapi.co/api/v2/pokemon/25/"
    },
    {
      "name": "raichu",
      "url": "https://pokeapi.co/api/v2/pokemon/26/"
    },
    {
      "name": "sandshrew",
      "url": "https://pokeapi.co/api/v2/pokemon/27/"
    },
    {
      "name": "sandslash",
      "url": "https://pokeapi.co/api/v2/pokemon/28/"
    },
    {
      "name": "nidoran-f",
      "url": "https://pokeapi.co/api/v2/pokemon/29/"
    },
    {
      "name": "nidorina",
      "url": "https://pokeapi.co/api/v2/pokemon/30/"
    },
    {
      "name": "nidoqueen",
      "url": "https://pokeapi.co/api/v2/pokemon/31/"
    },
    {
      "name": "nidoran-m",
      "url": "https://pokeapi.co/api/v2/pokemon/32/"
    },
    {
      "name": "nidorino",
      "url": "https://pokeapi.co/api/v2/pokemon/33/"
    },
    {
      "name": "nidoking",
      "url": "https://pokeapi.co/api/v2/pokemon/34/"
    },
    {
      "name": "clefairy",
      "url": "https://pokeapi.co/api/v2/pokemon/35/"
    },
    {
      "name": "clefable",
      "url": "https://pokeapi.co/api/v2/pokemon/36/"
    },
    {
      "name": "vulpix",
      "url": "https://pokeapi.co/api/v2/pokemon/37/"
    },
    {
      "name": "ninetales",
      "url": "https://pokeapi.co/api/v2/pokemon/38/"
    },
    {
      "name": "jigglypuff",
      "url": "https://pokeapi.co/api/v2/pokemon/39/"
    },
    {
      "name": "wigglytuff",
      "url": "https://pokeapi.co/api/v2/pokemon/40/"
    }
  ]
};

export const mockCatchedPokemons = [
  {
    name: "charmander",
    id: 4,
    nickname: "kevin",
    thumbnail:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/4.png",
  },
  {
    name: "charmander",
    id: 4,
    nickname: "second-kevin",
    thumbnail:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/4.png",
  },
  {
    name: "pikachu",
    id: 25,
    nickname: "pika",
    thumbnail:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png",
  },
];

export const mockLocalStorageCatchedPokemons = `[{"name":"charmander","id":4,"nickname":"kevin","thumbnail":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/4.png"},
{"name":"charmander","id":4,"nickname":"second-kevin","thumbnail":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/4.png"},
{"name":"pikachu","id":4,"nickname":"pika","thumbnail":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png"}]`;

export const mockLocalStorageAfterRemoved = `[{"name":"charmander","id":4,"nickname":"kevin","thumbnail":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/4.png"},{"name":"charmander","id":4,"nickname":"second-kevin","thumbnail":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/4.png"}]`;

export const mockPokemonDetails = {
  thumbnail: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/4.png",
  name: "charmander",
  id: 4,
  pokemonDetails: [
    {
      id: 4,
      name: "charmander",
      height: "6 decimetres",
      weight: "85 hectograms",
      types: ["Fire"]
    },
    {
      moves: [
        "Mega-punch",
        "Fire-punch",
        "Thunder-punch",
        "Scratch",
        "Swords-dance",
      ]
    },
    {
      abilities: [
        "Blaze",
        "Solar-power"
      ]
    }
  ]
}

export const mockPokemonDetailsResponse = {
  abilities: [
    {
      ability: {
        name: "blaze",
        url: "https://pokeapi.co/api/v2/ability/66/"
      },
      is_hidden: false,
      slot: 1
    },
    {
      ability: {
        name: "solar-power",
        url: "https://pokeapi.co/api/v2/ability/94/"
      },
      is_hidden: true,
      slot: 3
    }
  ],
  height: 6,
  id: 4,
  moves: [
    {
      "move": {
        "name": "mega-punch",
        "url": "https://pokeapi.co/api/v2/move/5/"
      },
    },
    {
      "move": {
        "name": "fire-punch",
        "url": "https://pokeapi.co/api/v2/move/7/"
      },
    },
    {
      "move": {
        "name": "thunder-punch",
        "url": "https://pokeapi.co/api/v2/move/9/"
      },
    },
    {
      "move": {
        "name": "scratch",
        "url": "https://pokeapi.co/api/v2/move/10/"
      },
    },
    {
      "move": {
        "name": "swords-dance",
        "url": "https://pokeapi.co/api/v2/move/14/"
      },
    },
  ],
  name: "charmander",
  sprites: {
    other: {
      home: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/4.png",
        front_female: null,
        front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/4.png",
        front_shiny_female: null
      },
    },
  },
  types: [
    {
      "slot": 1,
      "type": {
        "name": "fire",
        "url": "https://pokeapi.co/api/v2/type/10/"
      }
    }
  ],
  weight: 85
}