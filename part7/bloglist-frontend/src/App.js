import { useSelector } from 'react-redux';

import Notification from './components/Notification';
import LogInSuccess from './components/LogInSuccess';
import LoggedUserInfo from './components/loggedUserInfo';
import LoginForm from './components/LoginForm';
import UserList from './components/UserList';
import UserPage from './components/UserPage';
import BlogPage from './components/BlogPage';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {
	const user = useSelector(({ user }) => {
		return user;
	});

	const padding = {
		padding: 5,
	};

	return (
		<div>
			<h1>Blogs</h1>
			{/* <Link to="/">home</Link> */}
			<Router>
				<Link
					style={padding}
					to="/"
				>
					Home
				</Link>
				<Link
					style={padding}
					to="/users"
				>
					Users
				</Link>
				<Notification />
				<LoggedUserInfo />
				<Routes>
					<Route
						path="/"
						element={user ? <LogInSuccess /> : <LoginForm />}
					/>
					<Route
						path="/users"
						element={<UserList />}
					/>
					<Route
						path="/users/:id"
						element={<UserPage />}
					></Route>
					<Route
						path="/blogs/:id"
						element={<BlogPage />}
					></Route>
				</Routes>
				{/* {user ? <LogInSuccess /> : <LoginForm />} */}
			</Router>
		</div>
	);
};

export default App;
