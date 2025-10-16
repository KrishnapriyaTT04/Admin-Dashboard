import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    data: {},
    loading: false,
    dashCount: [],
    error: null
  },
  reducers: {
    dashCount: (state) => {
      state.listLoading = true;
    },
    dashCountSuccess: (state, action) => {
      state.listLoading = false;
      state.dashCount = action.payload;
    },
    dashCountFail: (state, action) => {
      state.listLoading = false;
    }
  }
});

export const { dashCount, dashCountSuccess, dashCountFail } = dashboardSlice.actions;
export default dashboardSlice.reducer;
