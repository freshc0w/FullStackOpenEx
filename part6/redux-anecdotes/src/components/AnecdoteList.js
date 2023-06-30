import { useDispatch, useSelector } from 'react-redux';
import { voteOnce } from '../reducers/anecdoteReducer';

const Anecdote = ({ anecdote, handleClick }) => {
	return (
		<>
			<div>{anecdote.content}</div>
			<div>
				has {anecdote.votes}
				<button onClick={handleClick}>vote</button>
			</div>
		</>
	);
};

const AnecdoteList = () => {
	const dispatch = useDispatch();
	// const anecdotes = useSelector(state => state.anecdotes);
	const anecs = useSelector(({ filter, anecdotes }) => {
		return anecdotes.filter(anec =>
			anec.content.toLowerCase().includes(filter.toLowerCase())
		);
	});

	return (
		<>
			{/* anecdotes are sorted by votes in descending order */}
			{anecs
				.sort((a, b) => b.votes - a.votes)
				.map(anecdote => (
					<Anecdote
						key={anecdote.id}
						anecdote={anecdote}
						handleClick={() => dispatch(voteOnce(anecdote.id))}
					/>
				))}
		</>
	);
};

export default AnecdoteList;
