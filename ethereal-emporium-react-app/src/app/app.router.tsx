import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from './Login';
import MasterLayout from './MasterLayout';
import Dashboard from './Dashboard';
import Error from './Error';
import React from 'react';
import {
  AuthenticationProvider,
  useAuthentication,
} from './hooks/useAuthentication';
import Products from './products/Products';

const ProtectedRoute = ({ children }: React.HTMLProps<HTMLDivElement>) => {
  const { isAuthenticated } = useAuthentication();

  return <>{isAuthenticated ? children : <Navigate to="/login" />}</>;
};

const AppRouter = createBrowserRouter([
  {
    element: <AuthenticationProvider />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <MasterLayout />
          </ProtectedRoute>
        ),
        errorElement: <Error title="Error Bro!" />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'products',
            element: <Products />,
          },
        ],
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: '*',
        element: <Error title="Not Found" />,
      },
    ],
  },
]);

export default AppRouter;
