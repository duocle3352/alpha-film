import { createSlice } from '@reduxjs/toolkit';
import { LIST_BOOKMARK } from '~/constans';

const bookmarkSlice = createSlice({
    name: 'bookmark',
    initialState: JSON.parse(localStorage.getItem(LIST_BOOKMARK)) || [],
    reducers: {
        addBookmark(state, action) {
            const isHad = state.some(
                // eslint-disable-next-line eqeqeq
                (element) => element.item.id == action.payload.item.id && element.type == action.payload.type,
            );

            if (isHad) {
                return;
            } else {
                state.unshift(action.payload);
                localStorage.setItem(LIST_BOOKMARK, JSON.stringify(state));
            }
        },
        removeBookmark(state, action) {
            state = JSON.parse(localStorage.getItem(LIST_BOOKMARK));
            const newState = state.filter((element) => element.item.id !== action.payload);
            localStorage.setItem(LIST_BOOKMARK, JSON.stringify(newState));
            return newState;
        },
    },
});

const { actions, reducer } = bookmarkSlice;
export const { addBookmark, removeBookmark } = actions;
export default reducer;
