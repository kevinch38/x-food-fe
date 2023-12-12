import { configureStore } from '@reduxjs/toolkit';
import asyncActionMiddleware from './middlewares/asyncActionMiddleware';
import uiSlice from './slices/uiSlice';
import accountSlice from './slices/accountSlice';

const setupStore = () => configureStore({
    reducer: {
        ui: uiSlice.reducer,
        account: accountSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(asyncActionMiddleware),
})

export default setupStore;