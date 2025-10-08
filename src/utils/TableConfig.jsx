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

export const userRating = {
  keys: ['createdOn', 'createdUser', 'comments', 'starRating'],
  config: {
     title: {
      label: 'Title',
      type: 'string',
      class: ' commonDesc'
    },
    comments: {
      label: 'Comment',
      type: 'string',
      class: 'cmn_Cap commonDesc'
    },
    starRating: {
      label: 'Rating', 
      type: 'number',
      class: 'cmn_Cap commonDesc'
    }
  }
};
  


export const facilityHeads = {
  keys: ['title', 'contactEmail', 'contactPhone'],
  config: {
    title: {
      label: 'Title',
      type: 'string',
      class: ' commonDesc'
    },
    contactEmail: {
      label: 'Email',
      type: 'string',
      class: ' cmn_Cap commonDesc'
    },
    contactPhone: {
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

