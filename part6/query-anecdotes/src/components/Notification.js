import { useNotifValue } from '../NotifContext';

const Notification = () => {
	const message = useNotifValue();
	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1,
		marginBottom: 5,
	};
	const noStyle = {};

	return <div style={message ? style : noStyle}>{message}</div>;
};

export default Notification;
