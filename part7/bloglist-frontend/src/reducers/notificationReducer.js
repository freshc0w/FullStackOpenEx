import { createSlice } from '@reduxjs/toolkit';

const initialState = { message: null, status: true };

const notifSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        displayNotification(state, action) {
            return {
                ...state,
                message: action.payload,
            };
        },
        setNotifStatus(state, action) {
            // Green if true, red if error.
            return {
                ...state,
                status: action.payload,
            }
        }
    }
})

export const { displayNotification, setNotifStatus } = notifSlice.actions;

export const setNotification = (content, delay) => {
    return dispatch => {
        dispatch(displayNotification(content));

        setTimeout(() => {
            dispatch(displayNotification(''))
        }, delay)
    }
}

export default notifSlice.reducer;