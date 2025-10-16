import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        list: [],
        listLoading: false,
        listError: null,
        listCount: 0,
        operationLoading: false,
        operationSuccess: false,
        operationError: null
    },
    reducers: {
        // --- User List Actions ---
        getUsers: (state) => {
            state.listLoading = true;
            state.listError = null;
        },
        getUsersSuccess: (state, action) => {
            state.listLoading = false;
            state.list = action.payload;
            state.listError = null;
        },
        getUsersFail: (state, action) => {
            state.listLoading = false;
            state.listError = {
                message: action.payload.message || 'Failed to fetch users',
                status: action.payload.status || 500
            };
        },

        // --- User Count Actions ---
        getUserCount: (state) => {
            state.listLoading = true;
        },
        getUserCountSuccess: (state, action) => {
            state.listLoading = false;
            state.listCount = action.payload.count;
        },
        getUserCountFail: (state) => {
            state.listLoading = false;
        },

        // --- User Update (Status Change) Actions ---

          updateUser: (state) => {
            state.operationLoading = true;
            state.operationSuccess = false;
            state.operationError = null;
        },

        /**
         * Action to handle successful user update.
         * It updates the user in the 'list' array.
         * @param {object} action.payload - The updated user object returned from the API.
         */
        updateUserSuccess: (state, action) => {
            state.operationLoading = false;

            // Find the index of the user to be updated
            const index = state.list.findIndex((u) => u.id === action.payload.id);

            if (index !== -1) {
                // Replace the old user object with the new one
                // Using spread operator to ensure immutability and trigger re-render
                state.list = [
                    ...state.list.slice(0, index), // Elements before the updated item
                    action.payload, // The new, updated item
                    ...state.list.slice(index + 1) // Elements after the updated item
                ];
            }

            state.operationSuccess = true;
        },

        /**
         * Action to handle failure during user update.
         * @param {object} action.payload - Contains error details (message, status).
         */
        updateUserFail: (state, action) => {
            state.operationLoading = false;
            state.operationError = {
                message: action.payload.message || 'Failed to update user',
                status: action.payload.status || 500
            };
        },

        // --- Utility Actions ---
        resetUserListError: (state) => {
            state.listError = null;
        },
        resetUserOperationState: (state) => {
            state.operationError = null;
            state.operationSuccess = false;
        }
    }
});

export const {
    getUsers,
    getUsersSuccess,
    getUsersFail,
    getUserCount,
    getUserCountSuccess,
    getUserCountFail,
    // Exported for the component
    updateUser,
    updateUserSuccess,
    updateUserFail,
    resetUserListError,
    resetUserOperationState
} = userSlice.actions;

export const selectUserList = (state) => state.user.list;
export const selectUserListLoading = (state) => state.user.listLoading;
export const selectUserListError = (state) => state.user.listError;

export default userSlice.reducer;