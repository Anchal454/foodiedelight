import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard';
import { CircularProgress } from '@mui/material';
export const IndexPage = lazy(() => import('../dash-pages/app'));
export const RestaurantPage = lazy(() => import('../dash-pages/restaurant'));
export const LoginPage = lazy(() => import('../dash-pages/login'));
export const ProductsPage = lazy(() => import('../dash-pages/products'));
export const Page404 = lazy(() => import('../dash-pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <PrivateRoute>
          <Suspense fallback={<CircularProgress />}>
            <DashboardLayout>
              <Outlet />
            </DashboardLayout>
          </Suspense>
        </PrivateRoute>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'restaurants', element: <RestaurantPage /> },
        { path: 'products', element: <ProductsPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}


const PrivateRoute = ({children}) => {
  const user = localStorage.getItem('user');
  return user ? children : <Navigate to="/login" replace />;
};