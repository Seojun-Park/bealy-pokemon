import { Main } from './pages/Main';
import { Layout } from './layouts/Layout';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [{ path: '/', element: <Main /> }],
  },
];
