import { configureStore } from '@reduxjs/toolkit';
import asyncActionMiddleware from './middlewares/asyncActionMiddleware';
import uiSlice from './slices/uiSlice';
import accountSlice from './slices/accountSlice';
import promotionSlice from './slices/promotionSlice';
import merchantSlice from './slices/merchantSlice';
import merchantBranchSlice from './slices/merchantBranchSlice';

const setupStore = () => configureStore({
    reducer: {
        ui: uiSlice.reducer,
        account: accountSlice.reducer,
        promotion: promotionSlice.reducer,
        merchant:merchantSlice.reducer,
        merchantBranch:merchantBranchSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(asyncActionMiddleware),
})

export default setupStore;