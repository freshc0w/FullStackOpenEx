import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const UserPage = () => {
	// Assume that there is an id in the params.
	const id = useParams().id;
	const users = useSelector(({ users }) => users);
	const user = users.find(u => u.id === id);

	// When page is refreshed, React Application has not received the data from the backend yet.
	if (!user) return null;

	return (
		<>
			<h1>{user.name}</h1>
			<h2>added blogs</h2>
			<ul>
				{user.blogs.map(blog => (
					<li key={blog.id}>{blog.title}</li>
				))}
			</ul>
		</>
	);
};

export default UserPage;
