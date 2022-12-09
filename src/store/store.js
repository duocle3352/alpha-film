import { configureStore } from '@reduxjs/toolkit';
import recentSlice from '~/features/recentSlice';
import bookmarkSlice from '~/features/bookmarkSlice';

const store = configureStore({
    reducer: {
        recent: recentSlice,
        bookmark: bookmarkSlice,
    },
});

export default store;
