import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	setNotification,
	setNotifStatus,
} from '../reducers/notificationReducer';
import { setUser } from '../reducers/userReducer';

import loginService from '../services/login';
import blogService from '../services/blogs';

const LoginForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');

        if(loggedUserJSON) {
            const tempUser = JSON.parse(loggedUserJSON)
            dispatch(setUser(tempUser))

            blogService.setToken(tempUser.token);
        }
    }, [])


	const handleLogin = async e => {
		e.preventDefault();

		try {
			const tempUser = await loginService.login({
				username,
				password,
			});

			window.localStorage.setItem(
				'loggedBlogappUser',
				JSON.stringify(tempUser)
			);

			blogService.setToken(tempUser.token);

			dispatch(setUser(tempUser));
			setUsername('');
			setPassword('');
		} catch (err) {
			// Set notification
			dispatch(setNotifStatus(false));
			dispatch(setNotification('wrong username or password', 5000));
		}
	};

	return (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					id="username"
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					id="password"
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button
				id="login-button"
				type="submit"
			>
				login
			</button>
		</form>
	);
};

export default LoginForm;
