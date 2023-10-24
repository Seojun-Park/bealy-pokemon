import {
  FC,
  useMemo,
  ReactNode,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
} from 'react';
import { PokemonBase } from '../type';

interface FavoriteContextProps {
  favorites: PokemonBase[];
  setFavorites: Dispatch<SetStateAction<PokemonBase[]>>;
  handleFavorite: (item: PokemonBase) => void;
}

interface FavoriteContextProviderProps {
  children: ReactNode;
}

export const FavoriteContext = createContext<FavoriteContextProps | undefined>(
  undefined
);

export const FavoriteContextProvider: FC<FavoriteContextProviderProps> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<PokemonBase[]>([]);

  useEffect(() => {
    const pokemons = localStorage.getItem('my_pokemon');
    if (pokemons) {
      setFavorites(JSON.parse(pokemons));
    }
  }, []);

  const handleFavorite = useCallback(
    (item: PokemonBase) => {
      const found = favorites.find((v) => v.name === item.name);
      if (!found) {
        setFavorites((prev) => [...prev, item]);
        const added = favorites.concat(item);
        localStorage.setItem('my_pokemon', JSON.stringify(added));
      } else {
        const filtered = favorites.filter((v) => v.name !== item.name);
        setFavorites(filtered);
        localStorage.setItem('my_pokemon', JSON.stringify(filtered));
      }
    },
    [favorites]
  );

  const contextValue = useMemo(
    () => ({
      favorites,
      setFavorites,
      handleFavorite,
    }),
    [favorites, handleFavorite, setFavorites]
  );

  return (
    <FavoriteContext.Provider value={contextValue}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavoriteContext = (): FavoriteContextProps => {
  const appContext = useContext(FavoriteContext);
  if (!appContext) {
    throw new Error('FavoriteContext is not initialized');
  }
  return appContext;
};

export default null;
