import { TotalValue } from './Content';

const Total = ({ courseParts }: TotalValue) => {
	return (
		<div>
			<h1>Number of exercises</h1>
			{courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
		</div>
	);
};

export default Total;
