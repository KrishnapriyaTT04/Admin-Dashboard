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
const UserRatingPage = Loadable(lazy(() => import('ui-component/user_rating/index')));
const UserFacility = Loadable(lazy(() => import('ui-component/user_facility/index')));
const UserReportedIssues = Loadable(lazy(() => import('ui-component/user_reported_issues/index')));








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
    // {
    //   path: 'rfq',
    //   children: [
    //     {
    //       path: '',
    //       element: <NopageFound />
    //     }
    //   ]
    // },
    // {
    //   path: 'jobOrder',
    //   children: [
    //     {
    //       path: '',
    //       element: <NopageFound />
    //     }
    //   ]
    // },
    // {
    //   path: 'myCustomers',
    //   children: [
    //     {
    //       path: '',
    //       element: <NopageFound />
    //     }
    //   ]
    // },

    {
      path: 'facility',
      children: [
        {
          path: '',
          element: <UserFacility />
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
    },
      {
      path: 'reportedIssues',
      children: [
        {
          path: '',
          element: <UserReportedIssues />
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
      path: 'rating',
      children: [
        {
          path: '',
          element: <UserRatingPage />
        }
      ]
    },


  ]
};

export default MainRoutes;
