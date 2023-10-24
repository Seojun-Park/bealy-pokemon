import { FC } from 'react';
import { Chip } from '.';
import styled from 'styled-components';
import { ColorType, theme } from '../utils/theme';
import { useNavigate } from 'react-router-dom';

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

export const Filters: FC = () => {
  const navigate = useNavigate();

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
              onClick={() => navigate(`/pokemon/type/${type.name}`)}
            />
          );
        })}
      </ChipBox>
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
