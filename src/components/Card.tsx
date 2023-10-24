import { FC, useEffect, useState } from 'react';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { Pokemon, PokemonBase, PokemonImageProps } from '../type';
import styled from 'styled-components';
import { ColorType, theme } from '../utils/theme';

interface CardProps {
  url: string;
}

export const Card: FC<CardProps> = ({ url }) => {
  const { isLoading, data } = useSWR<Pokemon>(url, fetcher);
  const [thumbnail, setThumbnail] =
    useState<PokemonImageProps['front_default']>();
  const [type, setType] = useState<PokemonBase[]>();

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
      console.log(data.types);
      setType(
        data.types.map((t) => ({
          name: t.type.name,
          url: t.type.url,
        }))
      );
    }
  }, [data]);

  return (
    <Wrapper>
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
                  <TypeBox
                    key={i}
                    style={{
                      backgroundColor: `${theme.colors[t.name as ColorType]}`,
                    }}>
                    <img src={t.url} />
                    <span>{t.name.toUpperCase()}</span>
                  </TypeBox>
                );
              })}
            </TypeBoxContainer>
          </Container>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: white;
  border-radius: ${theme.spacing.xs}px;
  box-shadow: 0px 6px 15px -4px #000000;
  margin: ${theme.spacing.md}px;
  padding: ${theme.spacing.md}px;
  width: 300px;
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
`;

const TypeBox = styled.div`
  padding: ${theme.spacing.xs / 2}px ${theme.spacing.sm}px;
  border-radius: ${theme.spacing.sm}px;
  margin: ${theme.spacing.xs / 2}px;
  & span {
    font-family: 'Pretendard';
    font-size: ${theme.fonts.desc}px;
    color: white;
  }
`;
