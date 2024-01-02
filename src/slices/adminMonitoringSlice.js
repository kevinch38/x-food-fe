import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const adminMonitoringAction = createAsyncThunk('adminMonitoring/addadminMonitoring', RequestHelper);
export const selectadminMonitoringAction = createAsyncThunk('adminMonitoring/selectadminMonitoring', RequestHelper);

const adminMonitoringSlice = createSlice({
    name: 'adminMonitoring',
    initialState: {
        adminMonitorings: [],
        selectedadminMonitoring: null,
    },
    extraReducers: (builder) => {
        builder.addCase(adminMonitoringAction.fulfilled, (state, { payload }) => {
            if (payload) {
                console.log(payload)
                state.adminMonitorings = payload.data;
            }
        });
        builder.addCase(selectadminMonitoringAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.selectedadminMonitoring = payload;
            }
        });

    }
})

export default adminMonitoringSlice;