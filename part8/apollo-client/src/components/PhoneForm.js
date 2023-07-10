import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { EDIT_NUMBER } from '../queries';

const PhoneForm = ({ setError }) => {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');

	const [changedNumber, result] = useMutation(EDIT_NUMBER);

	const submit = e => {
		e.preventDefault();

		// the rendering is automatic since there is an id related to the list. So the person's details saved to the cach update automatically when they are changed with the mutation.
		changedNumber({ variables: { name, phone } });

		setName('');
		setPhone('');
	};

	// When we try and change the number of a name that doesn't exist
	useEffect(() => {
		if (result.data && result.data.editNumber === null) {
			setError('person not found');
		}
	}, [result.data]); //eslint-disable-line

	return (
		<div>
			<h2>change number</h2>
			<form onSubmit={submit}>
				<div>
					name
					<input
						type="text"
						value={name}
						onChange={({ target }) => setName(target.value)}
					/>
				</div>
				<div>
					phone
					<input
						value={phone}
						onChange={({ target }) => setPhone(target.value)}
					/>
				</div>{' '}
				<button type="submit">change number</button>
			</form>
		</div>
	);
};

export default PhoneForm;
