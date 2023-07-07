import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';

const LoggedUserInfo = () => {
	const dispatch = useDispatch();
	const user = useSelector(({ user }) => user);

	const handleLogOut = () => {
		window.localStorage.removeItem('loggedBlogappUser');
		dispatch(setUser(null));
	};

	return (
		<p>
			{user && user.name} logged in
			<button onClick={handleLogOut}>logout</button>
		</p>
	);
};

export default LoggedUserInfo;
