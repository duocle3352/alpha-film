import { configureStore } from '@reduxjs/toolkit';
import recentSlice from '~/features/recentSlice';
import bookmarkSlice from '~/features/bookmarkSlice';
import sidebarSlice from '~/features/sidebarSlice';

const store = configureStore({
    reducer: {
        recent: recentSlice,
        bookmark: bookmarkSlice,
        sidebar: sidebarSlice,
    },
});

export default store;
