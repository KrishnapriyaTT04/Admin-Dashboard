// import { lazy } from 'react';
// import { Navigate } from 'react-router-dom';
// // project imports
// import MainLayout from 'layout/MainLayout';
// import Loadable from 'ui-component/Loadable';
// import AuthGuard from 'utils/authGuard';
// import { element } from 'prop-types';

// import StaffPage from 'views/staff';

// // dashboard routing
// const DashboardDefault = Loadable(lazy(() => import('ui-component/dashboard')));
// const DoctorsMenu = Loadable(lazy(() => import('ui-component/doctors')));
// const PatientsMenu = Loadable(lazy(() => import('ui-component/patients')));
// const TokenMenu = Loadable(lazy(() => import('ui-component/tokenQueue')));
// const BookingsMenu = Loadable(lazy(() => import('ui-component/bookings')));
// const StaffMenu = Loadable(lazy(() => import('ui-component/staff')));
// const NopageFound = Loadable(lazy(() => import('ui-component/common/no-page/NoPage')));
// // const UserManagementPage = Loadable(lazy(() => import('ui-component/user_management/index')));
// const UserFeedbackPage = Loadable(lazy(() => import('ui-component/user_feedback/index')));
// const UserRatingPage = Loadable(lazy(() => import('ui-component/user_rating/index')));
// // const UserFacility = Loadable(lazy(() => import('ui-component/user_facility/index')));
// // const UserReportedIssues = Loadable(lazy(() => import('ui-component/user_reported_issues/index')));


// // ==============================|| MAIN ROUTING ||============================== //

// const MainRoutes = {
//   path: '/',
//   element: (
//     <>
//       <AuthGuard user={['Vendor,Surveyor', 'Vendor', 'Requester']}>
//         <MainLayout />
//       </AuthGuard>
//     </>
//   ),
//   children: [
//     {
//       path: '',
//       element: <Navigate to="/dashboard" replace={true} />
//     },
//     {
//       path: '/dashboard',
//       element: <DashboardDefault />
//     },
//      {
//       path: '/doctors',
//       element: <DoctorsMenu />
//     },
//     {
//       path: '/patients',
//       element: <PatientsMenu />
//     },
//      {
//       path: '/tokenQueue',
//       element: <TokenMenu />
//     },
//     {
//       path: '/bookings',
//       element: <BookingsMenu />
//     },
//     {
//       path:'/staff',
//       element:<StaffMenu/>
//     }
//     // {
//     //   path: 'facility',
//     //   children: [
//     //     {
//     //       path: '',
//     //       element: <UserFacility />
//     //     }
//     //   ]
//     // },
//     //     {
//     //   path: 'userManagment',
//     //   children: [
//     //     {
//     //       path: '',
//     //       element: <UserManagementPage />
//     //     }
//     //   ]
//     // },
//     //   {
//     //   path: 'reportedIssues',
//     //   children: [
//     //     {
//     //       path: '',
//     //       element: <UserReportedIssues />
//     //     }
//     //   ]
//     // },
//     // {
//     //   path: 'userfeedback',
//     //   children: [
//     //     {
//     //       path: '',
//     //       element: <UserFeedbackPage />
//     //     }
//     //   ]
//     // },
//     //      {
//     //   path: 'rating',
//     //   children: [
//     //     {
//     //       path: '',
//     //       element: <UserRatingPage />
//     //     }
//     //   ]
//     // },


//   ]
// };

// export default MainRoutes;







import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/authGuard';

// ✅ Import your new Staff Page
// import StaffPage from 'views/staff';
// import AddDoctorForm from 'ui-component/staff/AddStaffsForm'

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('ui-component/dashboard')));
const DoctorsMenu = Loadable(lazy(() => import('ui-component/doctors')));
const PatientsMenu = Loadable(lazy(() => import('ui-component/patients')));
const TokenMenu = Loadable(lazy(() => import('ui-component/tokenQueue')));
const BookingsMenu = Loadable(lazy(() => import('ui-component/bookings')));
const StaffMenu = Loadable(lazy(() => import('ui-component/staff')));

// ❌ REMOVE this (old static staff UI)
// const StaffMenu = Loadable(lazy(() => import('ui-component/staff')));

const NopageFound = Loadable(lazy(() => import('ui-component/common/no-page/NoPage')));

const UserFeedbackPage = Loadable(lazy(() => import('ui-component/user_feedback/index')));
const UserRatingPage = Loadable(lazy(() => import('ui-component/user_rating/index')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard user={['Vendor,Surveyor', 'Vendor', 'Requester']}>
      <MainLayout />
    </AuthGuard>
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
      path: '/doctors',
      element: <DoctorsMenu />
    },
    {
      path: '/patients',
      element: <PatientsMenu />
    },
    {
      path: '/tokenQueue',
      element: <TokenMenu />
    },
    {
      path: '/bookings',
      element: <BookingsMenu />
    },
    {
      path: '/staff',
      element: <StaffMenu />
    },

    // Optional fallback
    {
      path: '*',
      element: <NopageFound />
    }
  ]
};

export default MainRoutes;