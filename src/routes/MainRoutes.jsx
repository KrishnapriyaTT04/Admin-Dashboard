import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/authGuard';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));
const NopageFound = Loadable(lazy(() => import('ui-component/common/no-page/NoPage')));
const UserManagementPage = Loadable(lazy(() => import('ui-component/user_management/index')));
const UserFeedbackPage = Loadable(lazy(() => import('ui-component/user_feedback/index')));




// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <>
      <AuthGuard user={['Vendor,Surveyor', 'Vendor', 'Requester']}>
        <MainLayout />
      </AuthGuard>
    </>
  ),
  children: [
    {
      path: '',
      element: <Navigate to="/dashboard" replace={true} />
    },
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'rfq',
      children: [
        {
          path: '',
          element: <NopageFound />
        }
      ]
    },
    {
      path: 'jobOrder',
      children: [
        {
          path: '',
          element: <NopageFound />
        }
      ]
    },
    {
      path: 'myCustomers',
      children: [
        {
          path: '',
          element: <NopageFound />
        }
      ]
    },
    {
      path: 'facility',
      children: [
        {
          path: '',
          element: <NopageFound />
        }
      ]
    },
    {
      path: 'userfeedback',
      children: [
        {
          path: '',
          element: <UserFeedbackPage />
        }
      ]
    },
    {
      path: 'userManagment',
      children: [
        {
          path: '',
          element: <UserManagementPage />
        }
      ]
    }
  ]
};

export default MainRoutes;
