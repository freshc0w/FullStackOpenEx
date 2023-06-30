import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import noteReducer from './reducers/noteReducer';

const store = createStore(noteReducer);

store.dispatch({
	type: 'NEW_NOTE',
	payload: {
		content: 'the app state is in redux store',
		important: true,
		id: 1,
	},
});

store.dispatch({
	type: 'NEW_NOTE',
	payload: {
		content: 'state changes are made with actions',
		important: false,
		id: 2,
	},
});

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderApp = () => {
	root.render(
		<Provider store={store}>
			<App />
		</Provider>
	);
};

renderApp();
// Need this to rerender app whenever state changes
store.subscribe(renderApp);

// const App = () => {
// 	return (
// 		<div>
// 			<ul>
// 				{store.getState().map(note => (
// 					<li key={note.id}>
// 						{note.content}{' '}
// 						<strong>{note.important ? 'important' : ''}</strong>
// 					</li>
// 				))}
// 			</ul>
// 		</div>
// 	);
// };

// const counterReducer = (state = 0, action) => {
// 	switch (action.type) {
// 		case 'INCREMENT':
// 			return state + 1;
// 		case 'DECREMENT':
// 			return state - 1;
// 		case 'ZERO':
// 			return 0;
// 		default:
// 			return state;
// 	}
// };

// const store = createStore(counterReducer);
// store.subscribe(() => {
// 	const storeNow = store.getState();
// 	console.log(storeNow);
// });
// store.dispatch({ type: 'INCREMENT' });
// store.dispatch({ type: 'INCREMENT' });
// store.dispatch({ type: 'INCREMENT' });
// store.dispatch({ type: 'ZERO' });
// store.dispatch({ type: 'DECREMENT' });
// store.dispatch({ type: 'INCREMENT' });

// const App = () => {
// 	return (
// 		<div>
// 			<div>{store.getState()}</div>
// 			<button onClick={e => store.dispatch({ type: 'INCREMENT' })}>
// 				PLUS
// 			</button>
//       <button onClick={e => store.dispatch({ type: 'DECREMENT' })}>
// 				MINUS
// 			</button>
//       <button onClick={e => store.dispatch({ type: 'ZERO' })}>
// 				ZERO
// 			</button>
// 		</div>
// 	);
// };
