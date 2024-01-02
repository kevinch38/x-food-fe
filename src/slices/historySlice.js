import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const historyAction = createAsyncThunk('history/addHistory', RequestHelper);
export const selectHistoryAction = createAsyncThunk('history/selectHistory', RequestHelper);

const historySlice = createSlice({
    name: 'history',
    initialState: {
        histories: [],
        selectedHistory: null,
    },
    extraReducers: (builder) => {
        builder.addCase(historyAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.histories = payload.data;
            }
        });
        builder.addCase(selectHistoryAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.selectedHistory = payload;
            }
        });

    }
})

export default historySlice;