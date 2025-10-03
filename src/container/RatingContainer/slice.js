import { createSlice } from '@reduxjs/toolkit';

const ratingSlice = createSlice({
    name: 'rating',
    initialState: {
        list: [],          // Stores the list of ratings
        listLoading: false, // Tracks loading state
        listError: null,    // Stores any errors
    },
    reducers: {

        /**
         * Triggered when fetching ratings starts.
         */
        getRatings: (state) => {
            state.listLoading = true;
            state.listError = null;
        },

        /**
         * Triggered when ratings are fetched successfully.
         * @param {object} action.payload - Array of rating objects
         */
        getRatingsSuccess: (state, action) => {
            state.listLoading = false;
            state.list = action.payload;
            state.listError = null;
        },

        /**
         * Triggered when fetching ratings fails.
         * @param {object} action.payload - Contains error details
         */
        getRatingsFail: (state, action) => {
            state.listLoading = false;
            state.listError = {
                message: action.payload.message || 'Failed to fetch ratings',
                status: action.payload.status || 500
            };
        },

        /**
         * Reset any existing rating list errors.
         */
        resetRatingListError: (state) => {
            state.listError = null;
        }
    }
});

// Export actions for dispatch
export const {
    getRatings,
    getRatingsSuccess,
    getRatingsFail,
    resetRatingListError
} = ratingSlice.actions;

// Export selectors for accessing state
export const selectRatingList = (state) => state.rating.list;
export const selectRatingListLoading = (state) => state.rating.listLoading;
export const selectRatingListError = (state) => state.rating.listError;

// Export reducer for store
export default ratingSlice.reducer;
