import { FC, useEffect, useState } from 'react';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { PokemonAll, PokemonBase } from '../type';
import { Card } from '../components';
import styled from 'styled-components';

export const Main: FC = () => {
  const [offSet, setOffset] = useState<number>(20);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const { data, isLoading } = useSWR<PokemonAll>(
    `/pokemon/?limit=${offSet}&offset=${pageIndex * offSet} - ${offSet}`,
    fetcher
  );
  const [pokemons, setPokemons] = useState<PokemonBase[]>();

  useEffect(() => {
    if (data) {
      setPokemons(data.results);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
      <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>

      <button onClick={() => setOffset(40)}>more</button>
      <Container>
        {pokemons?.map((p, i) => {
          return (
            <Card
              key={i}
              url={p.url}
            />
          );
        })}
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
