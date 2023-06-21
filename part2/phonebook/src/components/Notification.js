const Notification = ({ status, message }) => {
	if (!message) return null;

	const notifStyle = {
		color: 'green',
		background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
	};
    
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
    }

	return (
		<div
			style={status ? notifStyle : errorStyle}
			className="error"
		>
			{message}
		</div>
	);
};

export default Notification;
