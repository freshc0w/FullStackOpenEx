import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAnecs, createAnecs, updateAnec } from '../requests';

const AnecdoteForm = () => {
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
