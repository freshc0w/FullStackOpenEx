const Notify = ({ errorMessage }) => {
	return !errorMessage ? null : (
		<div style={{ color: 'red' }}>{errorMessage}</div>
	);
};

export default Notify;
