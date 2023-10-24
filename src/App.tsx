import { FC, PropsWithChildren } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { FavoriteContextProvider, SearchContextProvider } from './contexts';

const App: FC<PropsWithChildren> = () => {
  const elements = useRoutes(routes);
  return (
    <SearchContextProvider>
      <FavoriteContextProvider>{elements}</FavoriteContextProvider>
    </SearchContextProvider>
  );
};

export default App;
