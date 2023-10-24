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

export interface PokemonSpeciesType {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: false;
  habitat: PokemonBase;
  growth_rate: PokemonBase;
  pokedex_numbers: {
    entry_number: number;
    pokedex: PokemonBase;
  }[];
  egg_groups: PokemonBase[];
  color: PokemonBase;
  shape: PokemonBase;
  evolves_from_species: PokemonBase;
  evolution_chain: PokemonBase['url'];
  generation: PokemonBase;
  names: {
    name: string;
    language: PokemonBase;
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: PokemonBase;
    version: PokemonBase;
  }[];
  form_descriptions: {
    description: string;
    language: PokemonBase;
  }[];
  genera: {
    genus: string;
    language: PokemonBase;
  }[];
  varieties: {
    is_default: boolean;
    pokemon: PokemonBase;
  }[];
}

export interface PokemonByTypeProps {
  id: number;
  name: string;
  damage_relations: {
    no_damage_to: Array<PokemonBase>;
    half_damage_to: Array<PokemonBase>;
    double_damage_to: Array<PokemonBase>;
    no_damage_from: Array<PokemonBase>;
    half_damage_from: Array<PokemonBase>;
    double_damage_from: Array<PokemonBase>;
  };
  past_damage_relations: Array<{
    generation: PokemonBase;
    damage_relations: {
      no_damage_to: Array<PokemonBase>;
      half_damage_to: Array<PokemonBase>;
      double_damage_to: Array<PokemonBase>;
      no_damage_from: Array<PokemonBase>;
      half_damage_from: Array<PokemonBase>;
      double_damage_from: Array<PokemonBase>;
    };
  }>;
  game_indices: Array<{
    game_index: 4;
    generation: PokemonBase;
  }>;
  generation: PokemonBase;
  move_damage_class: PokemonBase;
  names: [
    {
      name: 'ã˜ã‚ã‚“';
      language: PokemonBase;
    }
  ];
  pokemon: Array<{
    slot: 1;
    pokemon: PokemonBase;
  }>;
  moves: Array<PokemonBase>;
}
