import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAnecs, createAnecs, updateAnec } from './requests';

const App = () => {
	const queryClient = useQueryClient();

	const updateAnecMutation = useMutation(updateAnec, {
		onSuccess: () => {
			queryClient.invalidateQueries('anecdotes');
		},
	});

	const handleVote = anecdote => {
		console.log('vote');
		updateAnecMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
	};

	// const anecdotes = [
	// 	{
	// 		content: 'If it hurts, do it more often',
	// 		id: '47145',
	// 		votes: 0,
	// 	},
	// ];

	const result = useQuery('anecdotes', getAnecs, {
		refetchOnWindowFocus: false,
	});

	if (result.isLoading) return <div>loading data...</div>;

	const anecdotes = result.data;

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map(anecdote => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>
							vote
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
