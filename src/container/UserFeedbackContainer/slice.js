import { List } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';
import { get } from 'immutable';
import { act } from 'react';

const userFeedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    list: [],
    error: null,
    listLoading: false,
    listCount: 0,
    countLoad: false,
    countError: null
  },
  reducers: {
    getUserFeedback: (state) => {
      state.listLoading = true;
      state.error = null;
    },

    getUserFeedbackSucces: (state, action) => {
      state.listLoading = false;
      state.list = action.payload;
      state.error = null;
    },
    getUserFeedbackFail: (state, action) => {
      state.listLoading = false;
      state.error = {
        message: action.payload.message || 'Failed to Fetch',
        status: action.payload.status || 500
      };
    },

    getUserFeedbackCount: (state) => {
      state.countLoad = true;
      state.countError = null;
    },
    getFeedbackCountSucces: (state, action) => {
      state.listCount = action.payload.count;
      state.countError = null;
      state.countLoad = false;
    },

    getFeedbackCountFail: (state, action) => {
      state.countLoad = false;
      state.countError = {
        message: action.payload.message || 'Failed to Fetch',
        status: action.payload.status || 500
      };
    }
  }
});

export const {
  getUserFeedback,
  getUserFeedbackSucces,
  getUserFeedbackFail,
  getUserFeedbackCount,
  getFeedbackCountSucces,
  getFeedbackCountFail
} = userFeedbackSlice.actions;

export const selectFeedbackList = (state) => state.feedback.list;
export const selectListLoading = (state) => state.feedback.listLoading;
export const selectFeedbackError = (state) => state.feedback.error;
export const selectFeedbackCount = (state) => state.feedback.listCount;
export const selectFeedbackCountError = (state) => state.feedback.countError;
export const selectFeedbackCountLoad = (state) => state.feedback.countLoad;

export default userFeedbackSlice.reducer;
