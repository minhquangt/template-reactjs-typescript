import { Fragment } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from 'src/configs/routes';
import PrivateRoutes from './components/PrivateRoute';
import UnauthorizedRoutes from 'src/components/UnauthorizedRoutes';
import './App.css';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          {privateRoutes.map((route, index) => {
            const Page = route.element;
            let Layout;

            if (route.layout) {
              Layout = route.layout;
            } else {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Route>
        <Route element={<UnauthorizedRoutes />}>
          {publicRoutes.map((route, index) => {
            const Page = route.element;
            let Layout;

            if (route.layout) {
              Layout = route.layout;
            } else {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
