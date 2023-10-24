import { FC, PropsWithChildren } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { FavoriteContextProvider } from './contexts';

const App: FC<PropsWithChildren> = () => {
  const elements = useRoutes(routes);
  return <FavoriteContextProvider>{elements}</FavoriteContextProvider>;
};

export default App;
