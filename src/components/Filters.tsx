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
  setFilter: Dispatch<SetStateAction<string>>;
}

export const Filters: FC<FiltersProps> = ({ currentFilter, setFilter }) => {
  const handleReset = () => {
    setFilter('');
  };

  return (
    <Wrapper>
      <span
        style={{
          fontFamily: 'GameBoy',
        }}>
        Filters
      </span>
      <ChipBox>
        {typeList.map((type, i) => {
          return (
            <Chip
              key={i}
              icon
              color={`${theme.colors[type.name as ColorType]}`}
              label={type.name}
              isButton
              onClick={() => setFilter(type.name)}
            />
          );
        })}
      </ChipBox>
      {currentFilter.trim() !== '' && (
        <FilterIdentifier>
          <span>Selected filter : </span>
          <Chip
            label={currentFilter}
            color={`${theme.colors[currentFilter as ColorType]}`}
            icon
          />
          <ResetButton onClick={handleReset}>X</ResetButton>
        </FilterIdentifier>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${theme.spacing.lg}px ${theme.spacing.lg}px;
`;

const ChipBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FilterIdentifier = styled.div`
  display: flex;
  align-items: center;
  margin: ${theme.spacing.xs}px;
  & span {
    font-family: 'GameBoy';
  }
`;

const ResetButton = styled.button`
  padding: ${theme.spacing.xs}px;
  font-family: 'GameBoy';
  border: none;
  background-color: transparent;
  color: red;
  cursor: pointer;
  transform: scale(1);
  &:hover {
    transition: 0.1s linear;
    transform: scale(1.7);
  }
`;
