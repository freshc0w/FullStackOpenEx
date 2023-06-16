import React from "react";
import "./App.css";
import { useState } from "react";

const Display = (props) => <div>{props.value}</div>;

const Button = ({ handleClick, text }) => {
	return <button onClick={handleClick}>{text}</button>;
};

const History = (props) => {
	if (!props.allClicks.length) {
		return <div>the app is used by pressing the buttons</div>;
	}
	return <div>button press history: {props.allClicks.join(" ")}</div>;
};

function App() {
	const [left, setLeft] = useState(0);
	const [right, setRight] = useState(0);
	const [allClicks, setAllClicks] = useState([]);
	const [total, setTotal] = useState(0);

	const [value, setValue] = useState(10);

	const handleLeftClick = () => {
		setAllClicks(allClicks.concat("L"));
		const updatedLeft = left + 1;
		setLeft(updatedLeft);
		setTotal(updatedLeft + right);
	};

	const handleRightClick = () => {
		setAllClicks(allClicks.concat("R"));
		const updatedRight = right + 1;
		setRight(updatedRight);
		setTotal(updatedRight + left);
	};

	const setToValue = (newValue) => () => {
		console.log("value now", newValue);
		setValue(newValue);
	};

	return (
		<div>
			{left}
			<Button
				handleClick={() => {
					console.log("Clicked Left!");
					handleLeftClick();
				}}
				text="left"
			/>
			<Button handleClick={handleRightClick} text="right" />
			{right}
			<History allClicks={allClicks} />
			<p> total {total}</p>

			<Display value={value} />
			<button onClick={setToValue(1000)}>thousand</button>
			<button onClick={setToValue(0)}>reset</button>
			<button onClick={setToValue(value + 1)}>increment</button>
		</div>
	);
}

export default App;
