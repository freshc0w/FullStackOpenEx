import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notifSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		displayNotification(state, action) {
			return action.payload;
		},
	},
});

export const { displayNotification } = notifSlice.actions;

export const setNotification = (content, delay) => {
	return dispatch => {
		dispatch(displayNotification(content));
		setTimeout(() => {
			dispatch(displayNotification(''));
		}, delay);
	};
};

export default notifSlice.reducer;
