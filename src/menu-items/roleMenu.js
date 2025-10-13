import { IconLayoutDashboard, IconScale, IconReceipt2, IconMessageCircle , IconStar, IconAlertTriangle, IconShieldCheck, IconClockHour1, IconFileImport, IconUserExclamation } from '@tabler/icons-react';

// constant
const icons = { IconLayoutDashboard, IconScale, IconReceipt2, IconStar,  IconMessageCircle, IconAlertTriangle, IconShieldCheck, IconClockHour1, IconFileImport, IconUserExclamation };

const RoleMenu = {
  id: 'dashboard',
  title: '',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.IconLayoutDashboard,
      breadcrumbs: false
    },
    {
      id: 'facility',
      title: 'Facilities',
      type: 'item',
      url: '/facility',
      icon: icons.IconShieldCheck,
      breadcrumbs: false
    },
        {
      id: 'userManagment',
      title: 'Users',
      type: 'item',
      url: '/userManagment',
      icon: icons.IconFileImport,
      breadcrumbs: false
    },
    
        {
      id: 'reportedIssues',
      title: 'Issues',
      type: 'item',
      url: '/reportedIssues',
      icon: icons.IconAlertTriangle,
      breadcrumbs: false
    },
    // {
    //   id: 'userfeedback',
    //   title: 'User Feedback',
    //   type: 'item',
    //   url: '/userfeedback',
    //   icon: icons.IconMessageCircle ,
    //   breadcrumbs: false
    // },
        {
      id: 'rating',
      title: 'Rating & Feedback',
      type: 'item',
      url: '/rating',
      icon: icons.IconStar,
      breadcrumbs: false
    },
    



  ]
};

export default RoleMenu;
