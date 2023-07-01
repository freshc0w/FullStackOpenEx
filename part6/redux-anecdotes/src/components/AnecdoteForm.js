import { useDispatch } from 'react-redux';
import { createAnec } from '../reducers/anecdoteReducer';
import { displayNotification } from '../reducers/notificationReducer';
import anecService from '../services/anecdotes';

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const addAnec = async e => {
		// Process of changing adding anecdote based on the input value
		e.preventDefault();
		const content = e.target.anec.value;
		e.target.anec.value = '';
		const newAnec = await anecService.createNew(content);
		dispatch(createAnec(newAnec));

		// Also display notification
		dispatch(displayNotification(`added '${content}'`));
		setTimeout(() => {
			dispatch(displayNotification(''));
		}, 5000);
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
