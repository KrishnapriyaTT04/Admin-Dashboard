import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  departments: [],
  loading: false,
  error: null
};

const departmentSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    getDepartmentsRequest: (state) => {
      state.loading = true;
    },
    getDepartmentsSuccess: (state, action) => {
      state.loading = false;
      state.departments = action.payload;
    },
    getDepartmentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addDepartmentRequest: (state) => {
      state.loading = true;
    },
    addDepartmentSuccess: (state, action) => {
      state.loading = false;
      state.departments.push(action.payload);
    },
    addDepartmentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteDepartmentRequest: (state) => {
      state.loading = true;
    },
    deleteDepartmentSuccess: (state, action) => {
      state.loading = false;
      state.departments = state.departments.filter(
        (dept) => dept._id !== action.payload
      );
    },
    deleteDepartmentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getDepartmentsRequest,
  getDepartmentsSuccess,
  getDepartmentsFailure,
  addDepartmentRequest,
  addDepartmentSuccess,
  addDepartmentFailure,
  deleteDepartmentRequest,
  deleteDepartmentSuccess,
  deleteDepartmentFailure
} = departmentSlice.actions;

export default departmentSlice.reducer;