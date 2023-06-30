import { useDispatch } from 'react-redux';
import { createAnec } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const addAnec = e => {
		e.preventDefault();
		const content = e.target.anec.value;
		e.target.anec.value = '';
		dispatch(createAnec(content));
	};

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={addAnec}>
				<div>
					<input
						type="test"
						name="anec"
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</>
	);
};

export default AnecdoteForm;
