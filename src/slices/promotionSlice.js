import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const promotionAction = createAsyncThunk('promotion/addpromotion', RequestHelper);
export const selectpromotionAction = createAsyncThunk('promotion/selectpromotion', RequestHelper);

const promotionSlice = createSlice({
    name: 'promotion',
    initialState: {
        promotions: [],
        selectedpromotion: null,
    },
    extraReducers: (builder) => {
        builder.addCase(promotionAction.fulfilled, (state, { payload }) => {
            if (payload) {
                console.log("A");
                console.log(payload)
                state.promotions = payload.data;
            }
        });
        builder.addCase(selectpromotionAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.selectedpromotion = payload;
            }
        });

    }
})

export default promotionSlice;