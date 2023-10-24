import { FC, useEffect, useState } from 'react';
import useSWR from 'swr';
import styled from 'styled-components';
import fetcher from '../utils/fetcher';
import { PokemonAll, PokemonBase } from '../type';
import { Card, Filters, SearchBar } from '../components';

export const Main: FC = () => {
  const [offSet, setOffset] = useState<number>(20);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const { data, isLoading } = useSWR<PokemonAll>(
    `/pokemon/?limit=${offSet}&offset=${pageIndex * offSet} - ${offSet}`,
    fetcher
  );
  const { data: t } = useSWR('/pokemon', fetcher);
  const [pokemons, setPokemons] = useState<PokemonBase[]>();
  const [term, setTerm] = useState<string>('');

  console.log(t)

  useEffect(() => {
    if (data) {
      setPokemons(data.results);
    }
  }, [data]);

  const handleSearch = () => {
    if (term.trim() === '') {
      window.alert('You should type any terms to search');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <button onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
      <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
      <button onClick={() => setOffset(40)}>more</button>
      <SearchBox>
        <SearchBar
          term={term}
          setTerm={setTerm}
          onSearch={handleSearch}
        />
      </SearchBox>
      <FilterBox>
        <Filters />
      </FilterBox>
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
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FilterBox = styled.div``;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
