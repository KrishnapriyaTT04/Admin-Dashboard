// import { createSlice } from '@reduxjs/toolkit';

// const staffSlice = createSlice({
//   name: 'staff',

//   initialState: {
//     staffList: [],
//     loading: false,
//     error: null
//   },

//   reducers: {
//    addStaff: (state) => {
//   state.loading = true;
// },

// addStaffSuccess: (state, action) => {
//   state.loading = false;
// },

// addStaffFail: (state, action) => {
//   state.loading = false;
//   state.error = action.payload;
// }
//   }
// });

// export const {
//   addStaff,
//   addStaffSuccess,
//   addStaffFail
// } = staffSlice.actions;

// export default staffSlice.reducer;




import { createSlice } from '@reduxjs/toolkit';

const staffSlice = createSlice({
  name: 'staff',

  initialState: {
    staffList: [],
    loading: false,
    error: null
  },

  reducers: {
   addStaff: (state) => {
  state.loading = true;
},

    addStaffSuccess: (state) => {
      state.loading = false;
    },

    addStaffFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getStaff,
  getStaffSuccess,
  getStaffFail,
  addStaff,
  addStaffSuccess,
  addStaffFail
} = staffSlice.actions;

export default staffSlice.reducer;