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
	const anecdotes = useSelector(state => state);

	return (
		<>
			{/* anecdotes are sorted by votes in descending order */}
			{anecdotes
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
