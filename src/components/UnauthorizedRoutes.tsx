import { Navigate, Outlet } from 'react-router-dom';

const UnauthorizedRoutes = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    return <Navigate to='/' replace={true} />;
  }

  return <Outlet />;
};

export default UnauthorizedRoutes;
