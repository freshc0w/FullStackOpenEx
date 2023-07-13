import { CourseParts } from '../App';

interface courseP {
	coursePart: CourseParts;
}

const Part = ({ coursePart }: courseP) => {
	const assertNever = (value: never): never => {
		throw new Error(
			`Unhandled discriminated union number: ${JSON.stringify(value)}`
		);
	};

	const [name, exerciseCount] = [coursePart.name, coursePart.exerciseCount];
	switch (coursePart.kind) {
		case 'basic':
			return (
				<>
					<h2>
						{name}, {exerciseCount}
					</h2>
					<p><i>{coursePart.description}</i></p>
				</>
			);
		case 'group':
			return (
				<>
					<h2>
						{name}, {exerciseCount}
					</h2>
					<p>project exercises: {coursePart.groupProjectCount}</p>
				</>
			);
		case 'background':
			return (
				<>
					<h2>
						{name}, {exerciseCount}
					</h2>
					<p><i>{coursePart.description}</i></p>
					<p>Submit to {coursePart.backgroundMaterial}</p>
				</>
			);
		case 'special':
			return (
        <>
					<h2>
						{name}, {exerciseCount}
					</h2>
					<p><i>{coursePart.description}</i></p>
          <p>required skills: {coursePart.requirements.map(r => r).join(', ')}</p>
				</>
			);
		default:
			return assertNever(coursePart);
	}
};

export default Part;
