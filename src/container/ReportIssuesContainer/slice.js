import { createSlice } from '@reduxjs/toolkit';

const reportIssueSlice = createSlice({
    name: 'reportIssue',
    initialState: {
        list: [],
        listLoading: false,
        listError: null,
    },
    reducers: {
      
        /**
         * Action to initiate the fetching of the issue report list.
         */
        getIssueReports: (state) => {
            state.listLoading = true;
            state.listError = null;
        },
        
        /**
         * Action to handle successful retrieval of the issue report list.
         * @param {object} action.payload - The array of issue report objects.
         */
        getIssueReportsSuccess: (state, action) => {
            state.listLoading = false;
            state.list = action.payload; 
            state.listError = null;
        },
        
        /**
         * Action to handle failure during issue report list retrieval.
         * @param {object} action.payload - Contains error details (message, status).
         */
        getIssueReportsFail: (state, action) => {
            state.listLoading = false;
            state.listError = {
                message: action.payload.message || 'Failed to fetch issue reports',
                status: action.payload.status || 500
            };
        },

        /**
         * Action to clear any existing error state for the issue report list.
         */
        resetIssueReportListError: (state) => {
            state.listError = null;
        }
        
    }
});

// Export actions for use in components or sagas/thunks
export const { 
    getIssueReports, 
    getIssueReportsSuccess, 
    getIssueReportsFail,
    resetIssueReportListError
} = reportIssueSlice.actions;

// Export selectors for easily accessing state in components
export const selectIssueReportList = (state) => state.reportIssue.list;
export const selectIssueReportListLoading = (state) => state.reportIssue.listLoading;
export const selectIssueReportListError = (state) => state.reportIssue.listError;

// Export the reducer for inclusion in the store
export default reportIssueSlice.reducer;