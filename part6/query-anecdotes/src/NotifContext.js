import { createContext, useReducer, useContext } from 'react';

const notifReducer = (state, action) => {
	switch (action.type) {
		case 'ADD':
			return `added anecdote ${action.payload}`;
		case 'VOTE':
			return `voted for "${action.payload}"`;
		case 'RESET':
			return '';
		default:
			return state;
	}
};

const NotifContext = createContext();

export const useNotifValue = () => {
	const notifAndDispatch = useContext(NotifContext);
	return notifAndDispatch[0];
};

export const useNotifDispatch = () => {
	const notifAndDispatch = useContext(NotifContext);
	return notifAndDispatch[1];
};

export const NotifContextProvider = props => {
	const [message, messageDispatch] = useReducer(notifReducer, '');

	return (
		<NotifContext.Provider value={[message, messageDispatch]}>
			{props.children}
		</NotifContext.Provider>
	);
};

export default NotifContext;
