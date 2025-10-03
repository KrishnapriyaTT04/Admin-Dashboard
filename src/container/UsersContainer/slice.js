import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        list: [],
        listLoading: false,
        listError: null,
    },
    reducers: {
      
        getUsers: (state) => {
            state.listLoading = true;
            state.listError = null;
        },
        
        /**
         * Action to handle successful retrieval of the user list.
         * @param {object} action.payload - The array of user objects.
         */
        getUsersSuccess: (state, action) => {
            state.listLoading = false;
            state.list = action.payload; 
            state.listError = null;
        },
        
        /**
         * Action to handle failure during user list retrieval.
         * @param {object} action.payload - Contains error details (message, status).
         */
        getUsersFail: (state, action) => {
            state.listLoading = false;
            state.listError = {
                message: action.payload.message || 'Failed to fetch users',
                status: action.payload.status || 500
            };
        },

        resetUserListError: (state) => {
            state.listError = null;
        }
        
    }
});

export const { 
    getUsers, 
    getUsersSuccess, 
    getUsersFail,
    resetUserListError
} = userSlice.actions;

export const selectUserList = (state) => state.user.list;
export const selectUserListLoading = (state) => state.user.listLoading;
export const selectUserListError = (state) => state.user.listError;

export default userSlice.reducer;