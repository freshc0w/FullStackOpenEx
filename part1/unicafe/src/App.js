import React from "react";
import { useState } from "react";

const Button = ({ handleClick, text }) => {
	return <button onClick={handleClick}>{text}</button>;
};

const StatisticsLine = ({ text, value }) => (
	<tr>
		<td>{text}</td>
		{text !== "positive" ? <td>{value}</td> : <td>{value}{"%"}</td>}
	</tr>
);

const Statistics = ({ good, neutral, bad }) => {
	const ifAny = (...ratings) => [...ratings].some((x) => x > 0);

	return !ifAny(good, neutral, bad) ? (
		<p>No Feedback given</p>
	) : (
		<div>
			<h1>statistics</h1>
			<table>
				<tbody>
					<StatisticsLine text="good" value={good} />
					<StatisticsLine text="neutral" value={neutral} />
					<StatisticsLine text="bad" value={bad} />
					<StatisticsLine text="all" value={good + neutral + bad} />
					<StatisticsLine
						text="average"
						value={(good - bad) / (good + neutral + bad)}
					/>
					<StatisticsLine
						text="positive"
						value={(good * 100) / (good + neutral + bad)}
					/>
				</tbody>
			</table>
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
