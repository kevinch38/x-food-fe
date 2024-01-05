import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const merchantBranchAction = createAsyncThunk('merchantBranch/addmerchantBranch', RequestHelper);
export const citiesAction = createAsyncThunk('cities/fetchcity', RequestHelper);
export const selectMerchantBranchAction = createAsyncThunk('merchantBranch/selectmerchantBranch', RequestHelper);

const merchantBranchSlice = createSlice({
    name: 'merchantBranch',
    initialState: {
        merchantBranches: [],
        selectedMerchantBranch: null,
        cities:[],
    },
    extraReducers: (builder) => {
        builder.addCase(merchantBranchAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.merchantBranches = payload.data;
            }
        });
        builder.addCase(citiesAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.cities = payload.data;
            }
        });
        builder.addCase(selectMerchantBranchAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.selectedMerchantBranch = payload;
            }
        });

    }
})

export default merchantBranchSlice;