import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: false,
    reducers: {
        showSidebar() {
            const newState = true;
            return newState;
        },
        hideSidebar() {
            const newState = false;
            return newState;
        },
    },
});

const { actions, reducer } = sidebarSlice;
export const { showSidebar, hideSidebar } = actions;
export default reducer;
