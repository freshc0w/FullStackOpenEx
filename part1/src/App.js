import React from "react";
import "./App.css";
import { useState } from "react";

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ handleClick, text }) => {
	return <button onClick={handleClick}>{text}</button>;
};

function App() {
	const [clicks, setClicks] = useState({
		left: 0,
		right: 0,
	});

	const handleLeftClick = () => setClicks({ ...clicks, left: ++clicks.left });

	const handleRightClick = () =>
		setClicks({ ...clicks, right: ++clicks.right });

	return (
		<div>
			{clicks.left}
			<button onClick={handleLeftClick}>left</button>
			<button onClick={handleRightClick}>right</button>
			{clicks.right}
		</div>
	);
}

export default App;
