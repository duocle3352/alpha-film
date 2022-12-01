import { configureStore } from '@reduxjs/toolkit';
import recentSlice from '~/features/recentSlice';

const store = configureStore({
    reducer: {
        recent: recentSlice,
    },
});

export default store;
