import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAnecs, createAnecs, updateAnec } from '../requests';
import { useNotifDispatch } from '../NotifContext';

const AnecdoteForm = () => {
	const dispatch = useNotifDispatch();
	const queryClient = useQueryClient();

	const newAnecMutation = useMutation(createAnecs, {
		onSuccess: () => {
			queryClient.invalidateQueries('anecdotes');
		},
	});

	const onCreate = event => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = '';

		newAnecMutation.mutate({ content, votes: 0 });

		dispatch({ type: 'ADD', payload: content });
		setTimeout(() => {
			dispatch({ type: 'RESET' });
		}, 5000);
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
