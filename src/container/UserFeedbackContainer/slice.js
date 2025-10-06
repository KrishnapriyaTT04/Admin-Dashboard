import { List } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';

const userFeedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    list: [],
    // loading: false,
    error: null,
    listLoading : false,

  },
  reducers: {
     
   getUserFeedback: (state) => {
    console.log('------------------------ called');
    
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
    getUserFeedback,getUserFeedbackSucces, getUserFeedbackFail
    
    // userLogin, loginSuccess, loginFail 
} = userFeedbackSlice.actions;


export const selectFeedbackList = (state) => state.feedback.list;
export const selectListLoading = (state) => state.feedback.listLoading;
export const selectFeedbackError = (state) => state.feedback.error;

export default userFeedbackSlice.reducer;
