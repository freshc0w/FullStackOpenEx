const Notification = ({ errorStatus, message }) => {
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

	if (message === null) return null;

	return <div style={errorStatus ? errorStyle : successStyle}>{message}</div>;
};

export default Notification;