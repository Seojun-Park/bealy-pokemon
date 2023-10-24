import {
  FC,
  useMemo,
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { PokemonAll, PokemonBase } from '../type';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';

interface SearchContextProps {
  handleSearch: (term: string) => PokemonBase[] | undefined;
}

interface SearchContextProviderProps {
  children: ReactNode;
}

export const SearchContext = createContext<SearchContextProps | undefined>(
  undefined
);

// @see This context is only for searching pokemon. Since pokemonAPI doesn't support searching option, I decided to implementing it at front part
// This context is not efficient however to implement searching function with less request, this ways is acceptable in my opinion.
// @see https://github.com/PokeAPI/pokeapi/issues/474
export const SearchContextProvider: FC<SearchContextProviderProps> = ({
  children,
}) => {
  const [data, setData] = useState<PokemonAll['results']>();
  const { data: queryData } = useSWR<PokemonAll>(
    `/pokemon/?limit=1292&offset=0`,
    fetcher
  );

  useEffect(() => {
    if (queryData) {
      setData(queryData['results']);
    }
  }, [queryData]);

  const handleSearch = useCallback(
    (term: string) => {
      const searched = data?.filter((v) => {
        return v.name.includes(term);
      });

      return searched;
    },
    [data]
  );

  const contextValue = useMemo(
    () => ({
      handleSearch,
    }),
    [handleSearch]
  );

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = (): SearchContextProps => {
  const appContext = useContext(SearchContext);
  if (!appContext) {
    throw new Error('SearchContext is not initialized');
  }
  return appContext;
};

export default null;
