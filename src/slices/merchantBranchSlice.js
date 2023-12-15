import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const merchantBranchAction = createAsyncThunk('merchantBranch/addmerchantBranch', RequestHelper);
export const selectMerchantBranchAction = createAsyncThunk('merchantBranch/selectmerchantBranch', RequestHelper);

const merchantBranchSlice = createSlice({
    name: 'merchantBranch',
    initialState: {
        merchantBranchs: [],
        selectedMerchantBranch: null,
    },
    extraReducers: (builder) => {
        builder.addCase(merchantBranchAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.merchantBranchs = payload.data;
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