import { createSlice } from '@reduxjs/toolkit';

const ratingSlice = createSlice({
    name: 'rating',
    initialState: {
        list: [], 
        listLoading: false, 
        listError: null,
        listCount: 0 
    },
    reducers: {
        /**
         * Triggered when fetching ratings starts.
         * @param {string} action.payload - The full API filter URL
         */
        getRatings: (state, action) => {
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
        },

        getRatingCount: (state, action) => {
            state.listLoading = true;
        },
        getRatingCountSuccess: (state, action) => {
            state.listLoading = false;
            // Assumes action.payload is { count: N }
            state.listCount = action.payload.count; 
        },
        getRatingCountFail: (state, action) => {
            state.listLoading = false;
            // Note: Error details for count can be handled here if needed, 
            // but is omitted for simplicity based on original structure.
        }
    }
});

// Export actions for dispatch
export const {
    getRatings,
    getRatingsSuccess,
    getRatingsFail,
    resetRatingListError,
    getRatingCount,
    getRatingCountSuccess,
    getRatingCountFail
} = ratingSlice.actions;

// Export selectors for accessing state
export const selectRatingList = (state) => state.rating.list;
export const selectRatingListLoading = (state) => state.rating.listLoading;
export const selectRatingListError = (state) => state.rating.listError;

// Export reducer for store
export default ratingSlice.reducer;