import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const authAction = createAsyncThunk('auth/login', RequestHelper);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        admin: null,
    },
    extraReducers: (builder) => {
        builder.addCase(authAction.fulfilled, (state, { payload }) => {
            if (payload.data && payload.data != typeof boolean) {
                state.admin = payload.data;
            }
        });
    }
})


export default authSlice;