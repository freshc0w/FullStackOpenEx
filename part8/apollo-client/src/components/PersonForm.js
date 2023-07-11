import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PERSON, ALL_PERSONS } from '../queries';
import { updateCache } from '../App';

const PersonForm = ({ setError }) => {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [street, setStreet] = useState('');
	const [city, setCity] = useState('');

	// const [createPerson] = useMutation(CREATE_PERSON);

	// Refetching queries to update the cache
	// const [createPerson] = useMutation(CREATE_PERSON, {
	// 	refetchQueries: [{ query: ALL_PERSONS }],
	// 	onError: error => {
	// 		const errors = error.graphQLErrors[0].extensions.error.errors;
	// 		const messages = Object.values(errors)
	// 			.map(e => e.message)
	// 			.join('\n');
	// 		setError(messages);
	// 	},
	// });

	// Optimised way (manually updating cache)
	const [createPerson] = useMutation(CREATE_PERSON, {
		onError: error => {
			setError(error.graphQLErrors[0].message);
		},
		update: (cache, response) => {
			updateCache(cache, { query: ALL_PERSONS }, response.data.addPerson);
		},
	});

	const submit = async e => {
		e.preventDefault();

		createPerson({
			variables: {
				name,
				street,
				city,
				phone: phone.length > 0 ? phone : undefined,
			},
		});

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
