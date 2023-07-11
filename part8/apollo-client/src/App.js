import { useState } from 'react';
import { useQuery, useApolloClient, useSubscription } from '@apollo/client';
import { ALL_PERSONS, PERSON_ADDED } from './queries';

import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Notify from './components/Notify';
import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm';

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedPerson) => {
	// helper that is used to eliminate saving same person twice
	const uniqByName = a => {
		let seen = new Set();
		return a.filter(item => {
			let k = item.name;
			return seen.has(k) ? false : seen.add(k);
		});
	};

	cache.updateQuery(query, ({ allPersons }) => {
		return {
			allPersons: uniqByName(allPersons.concat(addedPerson)),
		};
	});
};

const App = () => {
	const [errorMsg, setErrorMsg] = useState(null);
	const [token, setToken] = useState(null);

	const result = useQuery(ALL_PERSONS);
	const client = useApolloClient();

	useSubscription(PERSON_ADDED, {
		onData: ({ data }) => {
			const addedPerson = data.data.personAdded;
			notify(`${addedPerson.name} added`);
			updateCache(client.cache, { query: ALL_PERSONS }, addedPerson);
		},
	});

	if (result.loading) return <div>loading...</div>;

	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
	};

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
			<button onClick={logout}>logout</button>
			<Persons persons={result.data.allPersons} />
			<PersonForm setError={notify} />
			<PhoneForm setError={notify} />
		</div>
	);
};

export default App;
