import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useSWR from 'swr';
import styled from 'styled-components';
import fetcher from '../utils/fetcher';
import { PokemonByTypeProps } from '../type';
import { Card, Loading } from '../components';
import { theme } from '../utils/theme';

type ListByTypeParam = {
  typeId: string;
};

export const ListByType: FC = () => {
  const params = useParams<ListByTypeParam>();
  const { data, isLoading } = useSWR<PokemonByTypeProps>(
    `/type/${params.typeId}`,
    fetcher
  );
  const iconUrl = `/icons/${params.typeId}.png`;
  const [pokemon, setPokemon] = useState<PokemonByTypeProps['pokemon']>();

  useEffect(() => {
    if (data?.pokemon) {
      setPokemon(data.pokemon);
    }
  }, [data]);

  return (
    <Wrapper>
      {isLoading && <Loading />}
      <GoBackContainer>
        <Link to='/'>Go back</Link>
      </GoBackContainer>
      <Container>
        <TitleBox>
          <img
            src={iconUrl}
            width={theme.spacing.md}
            height={theme.spacing.md}
          />
          <span>{params.typeId}</span>
        </TitleBox>
        <Grid>
          {pokemon?.map((p, i) => {
            return (
              <Card
                key={i}
                url={p.pokemon.url}
              />
            );
          })}
        </Grid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const GoBackContainer = styled.div`
  width: 90%;
  padding: ${theme.spacing.md}px;
`;

const Container = styled.div`
  max-width: 90%;
  margin: 0 auto;
`;

const TitleBox = styled.div`
  padding: ${theme.spacing.md}px;
  margin: ${theme.spacing.lg}px;
  margin-top: ${theme.spacing.xs}px;
  background-color: white;
  border-radius: ${theme.spacing.sm}px;
  box-shadow: 0px 6px 15px -4px ${theme.colors.dark};
  display: flex;
  align-items: center;
  justify-content: center;

  & span {
    font-family: 'GameBoy';
  }

  & img {
    margin-right: ${theme.spacing.md}px;
  }
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
`;
