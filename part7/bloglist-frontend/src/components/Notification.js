import { useSelector } from 'react-redux';

const Notification = () => {

	const errorStyle = {
		color: 'red',
		background: 'lightgrey',
		fontSize: '20px',
		borderStyle: 'solid',
		borderRadius: '5px',
		padding: '10px',
		marginBottom: '10px',
	};

	const successStyle = {
		color: 'green',
		background: 'lightgrey',
		fontSize: '20px',
		borderStyle: 'solid',
		borderRadius: '5px',
		padding: '10px',
		marginBottom: '10px',
	};

	const message = useSelector(({ notification }) => notification.message);
	const errorStatus = useSelector(({ notification }) => notification.status);

	console.log(errorStatus)

	if (!message) return null;

	return (
		<div
			className="error"
			style={errorStatus ? successStyle : errorStyle}
		>
			{message}
		</div>
	);
};

export default Notification;
