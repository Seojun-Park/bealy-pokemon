export interface PokemonBase {
  name: string;
  url: string;
}

export interface PokemonAll {
  count: number;
  next: string;
  previous: string | null;
  results: Array<PokemonBase> | undefined;
}

export interface PokemonImageProps {
  [key: string]: string | null;
  back_default?: string | null;
  back_femail?: string | null;
  back_shiny?: string | null;
  back_shiny_female?: string | null;
  front_default?: string | null;
  front_shiny?: string | null;
  front_shiny_female?: string | null;
}

interface PokemonVersion {
  'generation-i': {
    'red-blue': PokemonImageProps;
    yellow: PokemonImageProps;
  };
  'generation-ii': {
    crystal: PokemonImageProps;
    gold: PokemonImageProps;
    silver: PokemonImageProps;
  };
  'generation-iii': {
    emerald: PokemonImageProps;
    'firered-leafgreen': PokemonImageProps;
    'ruby-sapphire': PokemonImageProps;
  };
  'generation-iv': {
    'diamond-pearl': PokemonImageProps;
    'heartgold-soulsilver': PokemonImageProps;
    platinum: PokemonImageProps;
  };
  'generation-v': {
    'black-white': PokemonImageProps & {
      animated: PokemonImageProps;
    };
  };
  'generation-vi': {
    'omegaruby-alphasapphire': PokemonImageProps;
    'x-y': {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/35.png';
      front_female: null;
      front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/shiny/35.png';
      front_shiny_female: null;
    };
  };
  'generation-vii': {
    icons: PokemonImageProps;
    'ultra-sun-ultra-moon': PokemonImageProps;
  };
  'generation-viii': {
    icons: PokemonImageProps;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  forms: Array<PokemonBase>;
  species: Array<PokemonBase>;
  sprites: {
    [key: string]: unknown;
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
    versions: PokemonVersionsGeneration;
  };
  types: Array<{
    slot: number;
    type: PokemonBase;
  }>;
}
