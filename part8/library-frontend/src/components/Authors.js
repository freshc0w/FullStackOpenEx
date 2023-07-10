import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const Authors = props => {
	const [name, setName] = useState('');
	const [born, setBorn] = useState('');

	const result = useQuery(ALL_AUTHORS);

	const [changedAuthor, bornResult] = useMutation(EDIT_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
	});

	const submit = e => {
		e.preventDefault();

		changedAuthor({ variables: { name, setBornTo: Number(born) } });
		setName('');
		setBorn('');
	};

	useEffect(() => {
		if (bornResult.data && bornResult.data.editAuthor === null)
			console.log('author not found');
	}, [bornResult.data]);

	if (!props.show) return null;
	if (result.loading) return <div>loading...</div>;

	const authors = result.data.allAuthors;

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map(a => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<h2>Set birthyear</h2>
			<form onSubmit={submit}>
				<div>
					{' '}
					name
					{/* <input
						type="text"
						value={name}
						onChange={({ target }) => setName(target.value)}
					/> */}
					<select
						value={name}
						onChange={({ target }) => setName(target.value)}
					>
						{authors.map(author => (
							<option
								key={author.name}
								value={author.name}
							>
								{author.name}
							</option>
						))}
					</select>
				</div>
				<div>
					{' '}
					born
					<input
						type="text"
						value={born}
						onChange={({ target }) => setBorn(target.value)}
					/>
				</div>
				<button type="submit">update author</button>
			</form>
		</div>
	);
};

export default Authors;
