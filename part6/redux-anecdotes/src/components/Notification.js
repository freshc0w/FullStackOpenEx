import { useSelector, useDispatch } from 'react-redux';
import { displayNotification } from '../reducers/notificationReducer';

const Notification = () => {
	const notification = useSelector(({ notification }) => notification);

	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1,
	};
	return <div style={style}>{notification}</div>;
};

export default Notification;
