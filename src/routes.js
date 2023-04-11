import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import Login from './pages/Login';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Employees from './pages/Employees';

// ----------------------------------------------------------------------

export default function Router() {

  return useRoutes([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'employees', element: <Employees /> }
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
