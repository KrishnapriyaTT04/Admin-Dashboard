import { List } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';
import { get } from 'immutable';
import { act } from 'react';

const userFeedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    list: [],
    // loading: false,
    error: null,
    listLoading : false,
    listCount : 0,
    countLoad: false,
    countError : null
  },
  reducers: {
     
   getUserFeedback: (state) => {    
    state.listLoading = true;
    state.error = null;
   } ,

   getUserFeedbackSucces:(state, action) =>{
    state.listLoading  = false;
    state.list = action.payload;
    state.error = null;
   },
   getUserFeedbackFail:(state, action) =>{
       state.listLoading =  false;
       state.error= {
        message: action.payload.message || 'Failed to Fetch',
        status: action.payload.status || 500
       }
   },


   getUserFeedbackCount: (state) => {
    state.countLoad = true;
    state.countError = null;
   },
   getFeedbackCountSucces: (state, action) => {
    console.log('---------------------countin succes   ---------- ', action.payload.count);
    
    state.listCount = action.payload.count;
        state.countError = null;
     state.countLoad = false;
     
   },


   getFeedbackCountFail: (state, action) => {
    state.countLoad = false;
     state.countError= {
        message: action.payload.message || 'Failed to Fetch',
        status: action.payload.status || 500
       }
   }

    // userLogin: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // loginSuccess: (state, action) => {
    //   state.loading = false;
    //   state.data = action.payload;
    //   state.error = null;
    // },
    // loginFail: (state, action) => {
    //   state.loading = false;
    //   state.error = {
    //     message: action.payload.message || 'Login failed',
    //     status: action.payload.status || 500
    //   };
    // }
  }
});

export const { 
    getUserFeedback,getUserFeedbackSucces, getUserFeedbackFail,getUserFeedbackCount,getFeedbackCountSucces,getFeedbackCountFail
    
    // userLogin, loginSuccess, loginFail 
} = userFeedbackSlice.actions;


export const selectFeedbackList = (state) => state.feedback.list;
export const selectListLoading = (state) => state.feedback.listLoading;
export const selectFeedbackError = (state) => state.feedback.error;
export const selectFeedbackCount = (state) => state.feedback.listCount;
export const selectFeedbackCountError = (state) => state.feedback.countError;
export const selectFeedbackCountLoad = (state) => state.feedback.countLoad;

export default userFeedbackSlice.reducer;