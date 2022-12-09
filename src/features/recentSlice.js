import { createSlice } from '@reduxjs/toolkit';
import { LIST_RECENT } from '~/constans';

const recentSlice = createSlice({
    name: 'recent',
    initialState: JSON.parse(localStorage.getItem(LIST_RECENT)) || [],
    reducers: {
        addRecent(state, action) {
            const isHad = state.some(
                (element) => element.id === action.payload.id && element.type === action.payload.type,
            );
            if (isHad) {
                return;
            } else {
                if (state.length >= 20) {
                    state.pop();
                    state.unshift(action.payload);
                } else {
                    state.unshift(action.payload);
                }
                localStorage.setItem(LIST_RECENT, JSON.stringify(state));
            }
        },
    },
});

const { actions, reducer } = recentSlice;
export const { addRecent } = actions;
export default reducer;
