import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer';

const LoggedUserInfo = () => {
    const dispatch = useDispatch();
    const userName = useSelector(({ user }) => user.name)

    const handleLogOut = () => {
		window.localStorage.removeItem('loggedBlogappUser');
		dispatch(setUser(null));
	};

    return (
        <p>
            {userName} logged in
            <button onClick={handleLogOut}>logout</button>
        </p>
    )
}


export default LoggedUserInfo