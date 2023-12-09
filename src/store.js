import { configureStore } from '@reduxjs/toolkit';
import asyncActionMiddleware from './middlewares/asyncActionMiddleware';
import uiSlice from './slices/uiSlice';

const setupStore = () => configureStore({
    reducer: {
        ui: uiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(asyncActionMiddleware),
})

export default setupStore;