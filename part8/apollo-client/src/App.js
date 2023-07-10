import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { ALL_PERSONS } from './queries';

import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm';

const App = () => {
	const [errorMsg, setErrorMsg] = useState(null);
	const [token, setToken] = useState(null);

	const result = useQuery(ALL_PERSONS);

	if (result.loading) return <div>loading...</div>;

	const notify = message => {
		setErrorMsg(message);
		setTimeout(() => {
			setErrorMsg(null);
		}, 10000);
	};

	if (!token) {
		return (
			<div>
				<Notify errorMessage={errorMsg} />
				<h2>Login</h2>
				<LoginForm
					setToken={setToken}
					setError={notify}
				/>
			</div>
		);
	}
	return (
		<div>
			<Notify errorMessage={errorMsg} />
			<Persons persons={result.data.allPersons} />
			<PersonForm setError={notify} />
			<PhoneForm />
		</div>
	);
};

const Notify = ({ errorMessage }) => {
	return !errorMessage ? null : (
		<div style={{ color: 'red' }}>{errorMessage}</div>
	);
};

export default App;
