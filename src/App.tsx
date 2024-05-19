import { Fragment } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from 'src/configs/routes';
import PrivateRoutes from './components/PrivateRoute';
import DefaultLayout from 'src/layouts/DefaultLayout';

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
      </Routes>
    </Router>
  );
}

export default App;
