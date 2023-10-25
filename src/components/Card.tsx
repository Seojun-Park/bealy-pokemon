import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { Pokemon, PokemonImageProps } from '../type';
import { ColorType, theme } from '../utils/theme';
import { Chip } from '.';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';
import { useFavoriteContext } from '../contexts';

interface CardProps {
  url: string;
  isLiked?: boolean;
}

export const Card: FC<CardProps> = ({ url, isLiked }) => {
  const navigate = useNavigate();
  const { isLoading, data } = useSWR<Pokemon>(url, fetcher);
  const [thumbnail, setThumbnail] =
    useState<PokemonImageProps['front_default']>();
  const [type, setType] = useState<string[]>();
  const { handleFavorite } = useFavoriteContext();

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
            <Name>{data?.name}</Name>
            <ActionBox>
              <Button
                label={'See detail'}
                font='GameBoy'
                onClick={() => navigate(`/pokemon/${data?.id}`)}
              />
              <Button
                icon={
                  <img
                    style={{
                      margin: 0,
                    }}
                    src={`/bealy-pokemon/icons/${isLiked ? 'heart-full' : 'heart-empty'}.png`}
                    width={20}
                    height={20}
                  />
                }
                onClick={() =>
                  handleFavorite({
                    name: data?.name || '',
                    url,
                  })
                }
              />
            </ActionBox>
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
  width: 350px;
  text-decoration: none;
  color: ${theme.colors.dark};
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
  margin-bottom: ${theme.spacing.sm}px;
  font-family: 'GameBoy';
`;

const TypeBoxContainer = styled.div`
  display: flex;
  margin-bottom: ${theme.spacing.sm}px;
`;

const ActionBox = styled.div`
  display: flex;
`;
