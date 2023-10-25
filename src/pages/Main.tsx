import { FC, useEffect, useState } from 'react';
import useSWR from 'swr';
import styled from 'styled-components';
import fetcher from '../utils/fetcher';
import { PokemonAll, PokemonBase } from '../type';
import {
  Card,
  DropDown,
  Filters,
  Loading,
  Pagination,
  SearchBar,
} from '../components';
import { useFavoriteContext, useSearchContext } from '../contexts';
import { theme } from '../utils/theme';

export const Main: FC = () => {
  const { favorites } = useFavoriteContext();
  const { handleSearch: search } = useSearchContext();
  const [perPage, setperPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchResult, setSearchResult] = useState<PokemonBase[] | undefined>();

  const { data, isLoading, mutate } = useSWR<PokemonAll>(
    `/pokemon/?limit=${perPage}&offset=${currentPage * perPage} - ${perPage}`,
    fetcher
  );
  const [pokemons, setPokemons] = useState<PokemonBase[]>();
  const [term, setTerm] = useState<string>('');

  useEffect(() => {
    if (data) {
      setPokemons(data.results);
    }
  }, [data]);

  useEffect(() => {
    mutate();
  }, [perPage, totalPages, mutate]);

  useEffect(() => {
    if (data?.count) {
      setTotalPages(data.count / perPage);
    }
  }, [data?.count, perPage]);

  const handleSearch = () => {
    if (term.trim() === '') {
      window.alert('Should enter any search term');
      setSearchResult(undefined);
      return;
    }
    setSearchResult(search(term));
    setTerm('');
  };

  return (
    <Wrapper>
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
      <PaginationBox>
        <Pagination
          totalPages={totalPages}
          perPage={perPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <DropDown<number>
          value={perPage}
          setValue={setperPage}
          options={[
            { id: 10, name: '10' },
            { id: 20, name: '20' },
            { id: 50, name: '50' },
            { id: 100, name: '100' },
            { id: 200, name: '200' },
            { id: 300, name: '300' },
          ]}
        />
      </PaginationBox>
      <Container>
        {searchResult && searchResult.length > 0 ? (
          searchResult.map((p, i) => {
            const isLiked = favorites.find((v) => v.name === p.name);
            return (
              <Card
                key={i}
                isLiked={isLiked ? true : false}
                url={p.url}
              />
            );
          })
        ) : isLoading || !pokemons ? (
          <Loading />
        ) : (
          pokemons?.map((p, i) => {
            const isLiked = favorites.find((v) => v.name === p.name);
            return (
              <Card
                key={i}
                isLiked={isLiked ? true : false}
                url={p.url}
              />
            );
          })
        )}
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

const PaginationBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media screen and (${theme.device.mobile}) {
    flex-direction: column;
  }
  
  @media screen and (${theme.device.desktop}) {
  }
`;
