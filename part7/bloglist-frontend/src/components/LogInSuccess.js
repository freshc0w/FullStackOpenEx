import LoggedUserInfo from './loggedUserInfo';
import BlogForm from './BlogForm';
import BlogList from './BlogList';

const LogInSuccess = () => (
	<div>
		<LoggedUserInfo />
		<h1>create New</h1>
		{<BlogForm />}
		<BlogList />
	</div>
);

export default LogInSuccess;
