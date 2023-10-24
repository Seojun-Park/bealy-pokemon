type DeviceType = 'mobile' | 'tablet' | 'desktop';
type FontsType = 'title' | 'subTitle' | 'heading' | 'p' | 'desc' | 'caption';
type SpacingType = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type ColorType =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy'
  | 'unknown'
  | 'shadow'
  | 'caption';

interface ThemeProps {
  device: Record<DeviceType, string>;
  fonts: Record<FontsType, number>;
  spacing: Record<SpacingType, number>;
  colors: Record<ColorType, string>;
}

export const theme: ThemeProps = {
  device: {
    mobile: `(min-width: 320px)`,
    tablet: `(min-width: 768px)`,
    desktop: `(min-width: 1280px)`,
  },
  fonts: {
    title: 36,
    subTitle: 30,
    heading: 24,
    p: 14,
    desc: 12,
    caption: 8,
  },
  spacing: {
    xl: 60,
    lg: 48,
    md: 36,
    sm: 24,
    xs: 12,
  },
  colors: {
    normal: '#949495',
    fighting: '#E09C40',
    flying: '#A2C3E7',
    poison: '#735198',
    ground: '#9C7743',
    rock: '#BFB889',
    bug: '#9FA244',
    ghost: '#684870',
    steel: '#69A9C7',
    fire: '#e56c3e',
    water: '#5185C5',
    grass: '#66A945',
    electric: '#F6D851',
    psychic: '#DD6B7B',
    ice: '#6DC8EB',
    dragon: '#535CA8',
    dark: '#4C4948',
    fairy: '#DAB4D4',
    unknown: '#d5ec6d',
    shadow: '#4b4f71',
    caption: '#99b9b2',
  },
};
