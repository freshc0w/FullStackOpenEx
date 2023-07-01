import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// Not needed anymore:
// import { createStore, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit';

import App from './App';
import anecdoteReducer, { setAnecs } from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';
import notificationReducer from './reducers/notificationReducer';
import anecService from './services/anecdotes';

const store = configureStore({
	reducer: {
		anecdotes: anecdoteReducer,
		filter: filterReducer,
		notification: notificationReducer,
	},
});

anecService.getAll().then(anecdotes => store.dispatch(setAnecs(anecdotes)));

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<App />
	</Provider>
);
