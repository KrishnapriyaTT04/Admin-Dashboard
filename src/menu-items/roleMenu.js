import { IconLayoutDashboard, IconScale, IconReceipt2, IconShieldCheck, IconClockHour1, IconFileImport } from '@tabler/icons-react';

// constant
const icons = { IconLayoutDashboard, IconScale, IconReceipt2, IconShieldCheck, IconClockHour1, IconFileImport };

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
      id: 'rfq',
      title: 'RFQ',
      type: 'item',
      url: '/rfq',
      icon: icons.IconLayoutDashboard,
      breadcrumbs: false
    },
    {
      id: 'jobOrder',
      title: 'Job Orders',
      type: 'item',
      url: '/jobOrder',
      icon: icons.IconScale,
      breadcrumbs: false
    },

    {
      id: 'myCustomers',
      title: 'My Customers',
      type: 'item',
      url: '/myCustomers',
      icon: icons.IconClockHour1,
      breadcrumbs: false
    },
    {
      id: 'facility',
      title: 'Facility',
      type: 'item',
      url: '/facility',
      icon: icons.IconShieldCheck,
      breadcrumbs: false
    },
    {
      id: 'userfeedback',
      title: 'User Feedback',
      type: 'item',
      url: '/userfeedback',
      icon: icons.IconReceipt2,
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

  ]
};

export default RoleMenu;
