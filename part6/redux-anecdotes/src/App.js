import { useSelector, useDispatch } from 'react-redux';
import { voteOnce, createAnec } from './reducers/anecdoteReducer';

const App = () => {
	const anecdotes = useSelector(state => state);
	const dispatch = useDispatch();

	const vote = id => {
		dispatch(voteOnce(id));
	};

	const addAnec = e => {
		e.preventDefault();
		const content = e.target.anec.value;
		e.target.anec.value = '';
		dispatch(createAnec(content));
	};

	return (
		<div>
			<h2>Anecdotes</h2>

			{/* anecdotes are sorted by votes in descending order */}
			{anecdotes
				.sort((a, b) => b.votes - a.votes)
				.map(anecdote => (
					<div key={anecdote.id}>
						<div>{anecdote.content}</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => vote(anecdote.id)}>
								vote
							</button>
						</div>
					</div>
				))}
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
		</div>
	);
};

export default App;
