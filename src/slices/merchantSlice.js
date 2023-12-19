import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const merchantAction = createAsyncThunk('merchant/addmerchant', RequestHelper);
export const selectMerchantAction = createAsyncThunk('merchant/selectmerchant', RequestHelper);

const merchantSlice = createSlice({
    name: 'merchant',
    initialState: {
        merchants: [],
        selectedMerchant: null,
    },
    extraReducers: (builder) => {
        builder.addCase(merchantAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.merchants = payload.data;
            }
        });
        builder.addCase(selectMerchantAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.selectedMerchant = payload;
            }
        });

    }
})

export default merchantSlice;