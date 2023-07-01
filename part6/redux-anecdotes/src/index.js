import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// Not needed anymore:
// import { createStore, combineReducers } from 'redux'

import App from './App';
import store from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<App />
	</Provider>
);
