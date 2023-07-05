import { useSelector } from 'react-redux';

import Notification from './components/Notification';
import LogInSuccess from './components/LogInSuccess';
import LoginForm from './components/LoginForm';

const App = () => {
	const user = useSelector(({ user }) => user);

	return (
		<>
			<h1>Blogs</h1>
			<Notification />
			{user ? <LogInSuccess /> : <LoginForm />}
		</>
	);
};

export default App;
