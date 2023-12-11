import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const accountAction = createAsyncThunk('account/addAccount', RequestHelper);
export const selectAccountAction = createAsyncThunk('account/selectAccount', RequestHelper);

const accountSlice = createSlice({
    name: 'account',
    initialState: {
        accounts: [],
        selectedAccount: null,
    },
    extraReducers: (builder) => {
        builder.addCase(accountAction.fulfilled, (state, { payload }) => {
            if (payload) {
                console.log(payload)
                state.accounts = payload.data;
            }
        });
        builder.addCase(selectAccountAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.selectedAccount = payload;
            }
        });

    }
})

export default accountSlice;