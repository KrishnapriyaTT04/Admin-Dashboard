export const userFeedback = {
  keys: ['createdOn', 'createdUser', 'comments'],
  config: {
    createdOn: {
      label: 'Created Date',
      type: 'date',
      class: ' commonDesc'
    },
    createdUser: {
      label: 'Created By',
      type: 'string',
      class: ' cmn_Cap commonDesc'
    },
    comments: {
      label: 'Comment',
      type: 'string',
      class: ' cmn_Cap commonDesc'
    }
  }
};


export const facilityHeads = {
  keys: ['title', 'email', 'phone'],
  config: {
    title: {
      label: 'Title',
      type: 'string',
      class: ' commonDesc'
    },
    email: {
      label: 'Email',
      type: 'string',
      class: ' cmn_Cap commonDesc'
    },
    phone: {
      label: 'Phone',
      type: 'string',
      class: ' cmn_Cap commonDesc'
    }
  }
};

export const usersHeads = {
  keys: ['fullName', 'email', 'phone','status'],
  config: {
    fullName: {
      label: 'Name',
      type: 'string',
      class: ' commonDesc'
    },
    email: {
      label: 'Email',
      type: 'string',
      class: ' cmn_Cap commonDesc'
    },
    phone: {
      label: 'Phone',
      type: 'string',
      class: ' cmn_Cap commonDesc'
    },
    status:{
      label: 'Status',
      type: 'string',
      class: ' cmn_Cap commonDesc'
    }
  }
};

