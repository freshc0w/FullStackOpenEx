import React from "react";
import { useState } from "react";

const Button = ({ handleClick, text }) => {
	return <button onClick={handleClick}> {text} </button>;
};

const Display = ({ anec, votes }) => {
	return (
		<>
			<p>{anec}</p>
			<p>This anecdote has {votes} votes </p>
		</>
	);
};

function App() {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
		"The only way to go fast, is to go well.",
	];
	const [selected, setSelected] = useState(0);
	const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
	const [popularAnec, setPopularAnec] = useState(anecdotes[0]);

	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	const handleAnecBtnClick = () => {
		setSelected(getRandomInt(anecdotes.length));
	};

	const handleVoteBtnClick = () => {
		const tempPoints = [...points];
		tempPoints[selected]++;
		setPoints(tempPoints);
		setPopularAnec(anecdotes[getPopularAnecIdx()]);
	};

	const getPopularAnecIdx = () => points.indexOf(Math.max(...points));

	return (
		<div>
			<h1>Anecdote of the day</h1>
			<Display anec={anecdotes[selected]} votes={points[selected]} />
			<Button handleClick={handleVoteBtnClick} text={"vote"} />
			<Button handleClick={handleAnecBtnClick} text={"next anecdote"} />

			<h1>Anecdote with the most votes</h1>
			<Display anec={popularAnec} votes={points[getPopularAnecIdx()]} />
		</div>
	);
}

export default App;
