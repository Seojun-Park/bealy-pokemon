import { FC, PropsWithChildren } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';

const App: FC<PropsWithChildren> = () => {
  const elements = useRoutes(routes);
  return <div>{elements}</div>;
};

export default App;
