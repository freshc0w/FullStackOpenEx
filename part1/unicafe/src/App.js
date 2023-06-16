import React from "react";
import { useState } from "react";

const Button = ({ handleClick, text }) => {
	return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
	const ifAny = (...ratings) => {
		return [...ratings].some((x) => x > 0);
	};

	return (
		<div>
			<h1>statistics</h1>
			<p>good {good} </p>
			<p>neutral {neutral} </p>
			<p>bad {bad} </p>
			<p>all {good + neutral + bad}</p>
			<p>
				average{" "}
				{ifAny(good, neutral, bad)
					? (good - bad) / (good + neutral + bad)
					: 0}{" "}
			</p>
			<p>
				positive{" "}
				{ifAny(good, neutral, bad)
					? (good * 100) / (good + neutral + bad)
					: 0}{" "}
			</p>
		</div>
	);
};

function App() {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleGoodClick = () => {
		setGood(good + 1);
	};
	const handleNeutralClick = () => {
		setNeutral(neutral + 1);
	};
	const handleBadClick = () => {
		setBad(bad + 1);
	};

	return (
		<div>
			<h1>give feedback</h1>
			<Button handleClick={handleGoodClick} text="Good" />
			<Button handleClick={handleNeutralClick} text="Neutral" />
			<Button handleClick={handleBadClick} text="Bad" />

			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
}

export default App;
