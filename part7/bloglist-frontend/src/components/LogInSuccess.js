import BlogForm from './BlogForm';
import BlogList from './BlogList';
import UserList from './UserList';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const LogInSuccess = () => (
	<div>
		<h1>create New</h1>
		<BlogForm />
		<BlogList />
	</div>
);

export default LogInSuccess;
