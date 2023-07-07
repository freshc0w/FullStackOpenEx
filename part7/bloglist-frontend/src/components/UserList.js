import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialiseUsers } from '../reducers/usersReducer';
import { Link } from 'react-router-dom';

const UserList = () => {
	const dispatch = useDispatch();
	const users = useSelector(({ users }) => users);

	// Need to get list of users from the backend.
	useEffect(() => {
		dispatch(initialiseUsers());
	}, [dispatch]);

	return (
		<>
			<h1>Users</h1>
			<table>
				<tbody>
					<tr>
						<td></td>
						<td>
							<strong>blogs created</strong>
						</td>
					</tr>
					{users.map(user => (
						<tr key={user.id}>
							<td>
								<Link to={`/users/${user.id}`}>
									{user.name}
								</Link>
							</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default UserList;
