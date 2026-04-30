// import { IconHelpCircle } from '@tabler/icons-react';

// const icons = { IconHelpCircle };

// const supportTypes = {
//   id: 'support-types',
//   title: 'Support Types',
//   type: 'group',
//   children: [
//     {
//       id: 'support-types-page',
//       title: 'Support Types',
//       type: 'item',
//       url: '/support-types',
//       icon: icons.IconHelpCircle,
//       breadcrumbs: false
//     }
//   ]
// };

// export default supportTypes;



import { IconHelp } from '@tabler/icons-react';

const icons = { IconHelp };

const support = {
  id: 'support',
  title: 'Support',
  type: 'group',
  children: [
    {
      id: 'support-page',
      title: 'Support',
      type: 'item',
      url: '/support',
      icon: icons.IconHelp,
      breadcrumbs: false
    }
  ]
};

export default support;