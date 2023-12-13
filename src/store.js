import { configureStore } from '@reduxjs/toolkit';
import asyncActionMiddleware from './middlewares/asyncActionMiddleware';
import uiSlice from './slices/uiSlice';
import accountSlice from './slices/accountSlice';
import promotionSlice from './slices/promotionSlice';

const setupStore = () => configureStore({
    reducer: {
        ui: uiSlice.reducer,
        account: accountSlice.reducer,
        promotion: promotionSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(asyncActionMiddleware),
})

export default setupStore;