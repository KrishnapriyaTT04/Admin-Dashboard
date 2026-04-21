import { createSlice } from '@reduxjs/toolkit';

const staffSlice = createSlice({
  name: 'staff',

  initialState: {
    staffList: [],
    loading: false,
    error: null
  },

  reducers: {
    /* ================= GET STAFF ================= */
    getStaff: (state) => {
      state.loading = true;
    },

    getStaffSuccess: (state, action) => {
      state.loading = false;
      state.staffList = action.payload.data; // store API data
    },

    getStaffFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ================= ADD STAFF ================= */
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