import { createSlice } from '@reduxjs/toolkit';

const facilitySlice = createSlice({
    name: 'facility',
    initialState: {
        // State for the list of all facilities
        list: [],
        listLoading: false,
        listError: null,
        
        // State for single facility operations (add/update/delete)
        operationLoading: false,
        operationError: null,
        operationSuccess: false,

        listcountLoading:false,
        listCount:0
    },
    reducers: {
        // === FETCH LIST ACTIONS ===
        
        getFacilities: (state) => {
            state.listLoading = true;
            state.listError = null;
        },
        getFacilitiesSuccess: (state, action) => {
            state.listLoading = false;
            state.list = action.payload; // Payload is the array of facilities
            state.listError = null;
        },
        getFacilitiesFail: (state, action) => {
            state.listLoading = false;
            state.listError = {
                message: action.payload.message || 'Failed to fetch facilities',
                status: action.payload.status || 500
            };
        },

        // === CREATE (ADD) ACTIONS ===

        createFacility: (state) => {
            state.operationLoading = true;
            state.operationError = null;
            state.operationSuccess = false;
        },
        createFacilitySuccess: (state, action) => {
            state.operationLoading = false;
            // IMPLEMENTED: Prepend the new facility to the list immediately
            state.list.unshift(action.payload); 
            state.operationSuccess = true;
        },
        createFacilityFail: (state, action) => {
            state.operationLoading = false;
            state.operationError = {
                message: action.payload.message || 'Failed to add facility',
                status: action.payload.status || 500
            };
        },
        
        // === UPDATE ACTIONS ===
        
        updateFacility: (state) => {
            state.operationLoading = true;
            state.operationError = null;
            state.operationSuccess = false;
        },
        updateFacilitySuccess: (state, action) => {
            state.operationLoading = false;
            // IMPLEMENTED: Find the updated facility and replace it in the list
            const index = state.list.findIndex(f => f.id === action.payload.id);
            if (index !== -1) {
                 // Redux Toolkit uses Immer, so direct mutation is safe
                state.list[index] = action.payload;
            }
            state.operationSuccess = true;
        },
        updateFacilityFail: (state, action) => {
            state.operationLoading = false;
            state.operationError = {
                message: action.payload.message || 'Failed to update facility',
                status: action.payload.status || 500
            };
        },

        // === DELETE ACTIONS (NEW) ===

        deleteFacility: (state) => {
            state.operationLoading = true;
            state.operationError = null;
            state.operationSuccess = false;
        },
        deleteFacilitySuccess: (state, action) => {
            state.operationLoading = false;
            // NEW: Filter out the deleted facility by ID (action.payload should be the ID)
            state.list = state.list.filter(f => f.id !== action.payload);
            state.operationSuccess = true;
        },
        deleteFacilityFail: (state, action) => {
            state.operationLoading = false;
            state.operationError = {
                message: action.payload.message || 'Failed to delete facility',
                status: action.payload.status || 500
            };
        },


       getFacilitiesCount: (state) => {
            state.listcountLoading = true;
            
        },
        getFacilitiesCountSuccess: (state, action) => {
            state.listcountLoading = false;
            state.listCount = action.payload; // Payload is the array of facilities
        },
        getFacilitiesCountFail: (state, action) => {
            state.listcountLoading = false;
            // state.listError = {
            //     message: action.payload.message || 'Failed to fetch facilities',
            //     status: action.payload.status || 500
            // };
        },
        

        // === UTILITY/RESET ACTIONS ===

        resetFacilityOperationState: (state) => {
            state.operationLoading = false;
            state.operationError = null;
            state.operationSuccess = false;
        }
    }
});

export const { 
    getFacilities, 
    getFacilitiesSuccess, 
    getFacilitiesFail,
    createFacility,
    createFacilitySuccess,
    createFacilityFail,
    updateFacility,
    updateFacilitySuccess,
    updateFacilityFail,
    // NEW EXPORTS
    deleteFacility,
    deleteFacilitySuccess,
    deleteFacilityFail,
    resetFacilityOperationState,
    getFacilitiesCount,
    getFacilitiesCountSuccess,
    getFacilitiesCountFail
} = facilitySlice.actions;

// Selectors for easy access to state
export const selectFacilityList = (state) => state.facility.list;
export const selectListLoading = (state) => state.facility.listLoading;
export const selectListError = (state) => state.facility.listError;
export const selectOperationLoading = (state) => state.facility.operationLoading;
export const selectOperationSuccess = (state) => state.facility.operationSuccess;
export const selectOperationError = (state) => state.facility.operationError;
export const selectListcountLoading = (state) => state.facility.listcountLoading;
export const selectListCount = (state) => state.facility.listCount;


export default facilitySlice.reducer;