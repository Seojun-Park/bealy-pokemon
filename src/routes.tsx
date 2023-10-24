import { Main } from './pages/Main';
import { Layout } from './layouts/Layout';
import { Detail, Favorite, ListByType } from './pages';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Main /> },
      { path: '/pokemon/:id', element: <Detail /> },
      { path: '/pokemon/type/:typeId', element: <ListByType /> },
      { path: '/pokemon/favorite', element: <Favorite /> },
    ],
  },
];
