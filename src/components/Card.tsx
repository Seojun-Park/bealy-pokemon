import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { Pokemon, PokemonImageProps } from '../type';
import { ColorType, theme } from '../utils/theme';
import { Chip } from '.';

interface CardProps {
  url: string;
}

export const Card: FC<CardProps> = ({ url }) => {
  const { isLoading, data } = useSWR<Pokemon>(url, fetcher);
  const [thumbnail, setThumbnail] =
    useState<PokemonImageProps['front_default']>();
  const [type, setType] = useState<string[]>();

  useEffect(() => {
    if (
      data?.sprites.versions['generation-v'] &&
      data?.sprites.versions['generation-v']['black-white']
    ) {
      setThumbnail(
        data.sprites.versions['generation-v']['black-white'].animated
          .front_default || data.sprites.front_default
      );
    }
    if (data?.types) {
      setType(data.types.map((t) => t.type.name));
    }
  }, [data]);

  return (
    <Wrapper to={`/pokemon/${data?.id}`}>
      {isLoading ? (
        <span>Loading... </span>
      ) : (
        <>
          <Container>
            <IdBox>
              <img
                src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'
                alt='ball'
              />
              <span>{data?.id}</span>
            </IdBox>
            <img
              src={thumbnail || ''}
              height={120}
            />
            <Name>{data?.name}</Name>
            <TypeBoxContainer>
              {type?.map((t, i) => {
                return (
                  <Chip
                    key={i}
                    color={`${theme.colors[t as ColorType]}`}
                    label={t}
                  />
                );
              })}
            </TypeBoxContainer>
          </Container>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(Link)`
  background-color: white;
  border-radius: ${theme.spacing.xs}px;
  box-shadow: 0px 6px 15px -4px #000000;
  margin: ${theme.spacing.md}px;
  padding: ${theme.spacing.md}px;
  width: 350px;
  cursor: pointer;
  transform: scale(1);
  text-decoration: none;
  color: ${theme.colors.dark};

  &:hover {
    opacity: 0.8;
    transition: 0.1s linear;
    transform: scale(1.04);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & img {
    margin-bottom: ${theme.spacing.sm}px;
  }
`;

const IdBox = styled.div`
  display: flex;
  align-items: center;
  & img {
    margin-bottom: 0;
    margin-right: ${theme.spacing.xs}px;
  }
  & span {
    font-family: 'GameBoy';
    font-size: ${theme.fonts.heading};
  }
`;

const Name = styled.span`
  font-family: 'GameBoy';
`;

const TypeBoxContainer = styled.div`
  display: flex;
  margin-top: ${theme.spacing.sm}px;
`;
