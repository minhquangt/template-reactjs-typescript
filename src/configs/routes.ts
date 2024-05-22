import DefaultLayout from 'src/layouts/DefaultLayout';
import Home from 'src/pages/Home';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import Users from 'src/pages/Users';

export const privateRoutes = [
  {
    path: '/',
    element: Home,
    layout: DefaultLayout
  },
  {
    path: '/users',
    element: Users,
    layout: DefaultLayout
  }
];
export const publicRoutes = [
  {
    path: '/login',
    element: Login,
    layout: null
  },
  {
    path: '*',
    element: NotFound,
    layout: null
  }
];
