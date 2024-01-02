import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import RequestHelper from '../services/RequestHelper';

export const promotionAction = createAsyncThunk('promotion/addpromotion', RequestHelper);
export const selectPromotionAction = createAsyncThunk('promotion/selectpromotion', RequestHelper);

const promotionSlice = createSlice({
    name: 'promotion',
    initialState: {
        promotions: [],
        selectedPromotion: null,
    },
    extraReducers: (builder) => {
        builder.addCase(promotionAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.promotions = payload.data;
            }
        });
        builder.addCase(selectPromotionAction.fulfilled, (state, { payload }) => {
            if (payload) {
                state.selectedPromotion = payload;
            }
        });

    }
})

export default promotionSlice;