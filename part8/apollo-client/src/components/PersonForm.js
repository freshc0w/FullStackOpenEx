import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { CREATE_PERSON, ALL_PERSONS } from '../queries';

const PersonForm = props => {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [street, setStreet] = useState('');
	const [city, setCity] = useState('');

	// const [createPerson] = useMutation(CREATE_PERSON);

	// Refetching queries to update the cache
	const [createPerson] = useMutation(CREATE_PERSON, {
		refetchQueries: [{ query: ALL_PERSONS }],
	});

	const submit = e => {
		e.preventDefault();

		createPerson({ variables: { name, phone, street, city } });

		setName('');
		setPhone('');
		setStreet('');
		setCity('');
	};

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={submit}>
				<div>
					name{' '}
					<input
						type="text"
						value={name}
						onChange={({ target }) => setName(target.value)}
					/>
				</div>
				<div>
					phone{' '}
					<input
						type="text"
						value={phone}
						onChange={({ target }) => setPhone(target.value)}
					/>
				</div>
				<div>
					street{' '}
					<input
						type="text"
						value={street}
						onChange={({ target }) => setStreet(target.value)}
					/>
				</div>
				<div>
					city{' '}
					<input
						type="text"
						value={city}
						onChange={({ target }) => setCity(target.value)}
					/>
				</div>
				<button type="submit">add!</button>
			</form>
		</div>
	);
};

export default PersonForm;
