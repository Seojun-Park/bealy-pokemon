import { Dispatch, FC, SetStateAction } from 'react';
import { Chip } from '.';
import styled from 'styled-components';
import { ColorType, theme } from '../utils/theme';

const typeList = [
  { name: 'normal', url: '' },
  { name: 'fighting', url: '' },
  { name: 'flying', url: '' },
  { name: 'poison', url: '' },
  { name: 'ground', url: '' },
  { name: 'rock', url: '' },
  { name: 'bug', url: '' },
  { name: 'ghost', url: '' },
  { name: 'steel', url: '' },
  { name: 'fire', url: '' },
  { name: 'water', url: '' },
  { name: 'grass', url: '' },
  { name: 'electric', url: '' },
  { name: 'psychic', url: '' },
  { name: 'ice', url: '' },
  { name: 'dragon', url: '' },
  { name: 'dark', url: '' },
  { name: 'fairy', url: '' },
];

interface FiltersProps {
  currentFilter: string;
  setFilters: Dispatch<SetStateAction<string>>;
}

export const Filters: FC<FiltersProps> = ({ currentFilter, setFilters }) => {
  return (
    <Wrapper>
      {typeList.map((type, i) => {
        return (
          <Chip
            key={i}
            icon
            color={`${theme.colors[type.name as ColorType]}`}
            label={type.name}
            isButton
            onClick={() => console.log('submit')}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
